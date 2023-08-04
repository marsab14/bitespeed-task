const express = require("express");
const cors = require("cors");

const config = require("./src/config/index");
const InitApp = require("./src/initapp");
const { 
    INTERNAL_SERVER_ERROR, PAGE_NOT_FOUND_ERROR, BaseError

} = require("./src/common/libs/errors");
const router = require('./src/api/routes/index')


const app = express();



InitApp(app).then(() => {
  app.use(express.json({ limit: "1mb" }));
  app.use(
    express.urlencoded({
      extended: false,
      limit: "200mb",
      extended: true,
      parameterLimit: 1000000,
    })
  );
  app.use(cors());

  /* Routes */
    app.use(config.node.pathPrefix, router)
  /* Routes */


  /* Page Not Found & Erro Handlers*/

  app.use((req, res, next) => {
    next(new PAGE_NOT_FOUND_ERROR());
  });

  app.use(async (error, req, res, next) => {
    try {
      if (!(error instanceof BaseError)) {
        throw new INTERNAL_SERVER_ERROR();
      } else throw error;
    } catch (err) {
      console.log("error inside user mgmt service", err);
      await err.handleError(req, res);
    }
  });

  /* */

  app.listen(config.node.hostPort, async () => {
    console.log(`Base URL :: ${config.node.url}${config.node.pathPrefix}`);
  });
});
