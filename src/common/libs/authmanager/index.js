const jwt = require('jsonwebtoken')
const config = require('../../../config/index');
const { AUTH_TOKEN_ERROR, REFRESH_TOKEN_ERROR, UNAUTH_ERROR } = require('../errors');

const { accessTokenExpiration, refreshTokenExpiration, tokenSecret } = config.jwt

class AuthManager {

    static async issueTokens(payload) {
      console.log("payload is", payload)
      if (payload == null || typeof payload === "undefined") {
        throw new Error("Payload Empty");
      }
  
      const accessTokenOptions = {
        subject: "accessToken",
        algorithm: "HS256", // default
        expiresIn: accessTokenExpiration,
        notBefore: "120ms",
        issuer: "acare::service",
      };
  
      const refreshTokenOptions = {
        ...accessTokenOptions,
        subject: "refreshToken",
        expiresIn: refreshTokenExpiration,
      };
  
      const accessToken = jwt.sign(payload, tokenSecret, accessTokenOptions);
  
      const { userId } = payload;
      const refreshTokenPayload = { userId, scope: [] };
      const refreshToken = jwt.sign(
        refreshTokenPayload,
        tokenSecret,
        refreshTokenOptions
      );
  
      let body = {};
  
      return Object.freeze({
        accessToken,
        refreshToken,
        body,
      });
    }
  
    static async verifyToken(token) {
      // validate user according to role
      return jwt.verify(token, tokenSecret, (err, res) => {
        if (err) {
          throw err;
        } else return true;
      });
    }
  
    static async decodeAuthToken(req, res, next) {
      const authString = req.headers.authorization ?? "";
      if (authString == null || typeof authString === "undefined") {
        return next();
      }
  
      const jwtSubject = authString.split(" ")[0];
      const jwtToken = authString.split(" ")[1];
  
      if (jwtToken == null || typeof jwtToken === "undefined") {
        return next();
      }
  
      return jwt.verify(jwtToken, tokenSecret, async (err, decoded) => {
        if (err || decoded.sub !== jwtSubject) {
          if (jwtSubject === "accessToken")
            return next(new AUTH_TOKEN_ERROR(err));
          if (jwtSubject === "refreshToken")
            return next(new REFRESH_TOKEN_ERROR(err));
        }
        req.authPayload = decoded;
        return next();
      });
    }
  
    static requireScope(scopes) {
      return async (req, res, next) => {
        try {
          const { authPayload } = req;
          if(!authPayload) {
            const err = new Error("Auth payload does not exists");
            return next(new AUTH_TOKEN_ERROR(err))
          }
          let requestScopes = authPayload.scope ?? null;
          requestScopes = [].concat(requestScopes);
          authPayload.scope = requestScopes;
          const requiredScope = authPayload.scope.filter((value) => scopes.includes(value))
          if(requiredScope.length > 0) {
            return next();
          }
          throw Error('Not Authenticated User')
        } catch(err) {
          return next(new UNAUTH_ERROR(err))
        }
      }
    }
  
  }
  module.exports = AuthManager;