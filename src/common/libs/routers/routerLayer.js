const HttpResponseHandler = require('../../helper/HttpResponseHandler')

const handleRequest = async (fn, dataValues) => {
    // validate dataValues with validation Schema
    const data = await fn(dataValues);
    return data;
  };
  
  const handleRESTReq = (fn) => async (req, res, next) => {
    try {
      const restHeader = req.headers;
      const restBody = req.body;
      const restParams = req.params;
      const restQuery = req.query;
      const user = req.authPayload;
      const dataValues = {
           user,
        ...restHeader,
        ...restParams,
        ...restBody,
        ...restQuery,
      };
      const data = await handleRequest(fn, dataValues);
      HttpResponseHandler.success(req, res, data);
    } catch (error) {
      console.log(error)
      next(error);
    }
  };

  module.exports = {
    handleRESTReq
  }