import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import { errorHandler as queryErrorHandler } from "querymen";
import { errorHandler as bodyErrorHandler } from "bodymen";
import { env } from "../../config";
import { getErrorPattern, getErrorPattern2 } from '../../services/constant/regex_pattern';

export default (apiRoot, routes) => {
  const app = express();

  /* istanbul ignore next */
  if (env === "production" || env === "development") {
    app.use(cors());
    app.use(compression());
    app.use(morgan("dev"));
  }
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  // app.use((error, req, res, next) => {
  //   console.log("sample", error.message);
  //   let message = error.message.match(getErrorPattern) ? error.message.match(getErrorPattern) : error.message.match(getErrorPattern2);
  //   res.status(error.status || 500).send({
  //     error: {
  //       status: error.status || 500,
  //       message: message ? message[0].split(', ') : null || 'Internal Server Error',
  //     },
  //   });    
  //   next(res);
  // });

  return app;
};
