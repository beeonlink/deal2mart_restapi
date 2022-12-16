/* eslint-disable no-unused-vars */
import path from "path";
import merge from "lodash/merge";
const cloudinary = require('cloudinary').v2;

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  dotenv.config({
    path: path.join(__dirname, "../.env"),
    example: path.join(__dirname, "../.env.example"),
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 9000,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "",
    defaultEmail: "no-reply@deal-2-mart-restapi.com",
    sendgridKey: requireProcessEnv("SENDGRID_KEY"),
    masterKey: requireProcessEnv("MASTER_KEY"),
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    mongo: {
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    },
  },
  test: {},
  development: {
    mongo: {
      uri: process.env.MONGODB_URI || "127.0.0.1",
      options: {
        debug: true,
      },
    },
  },
  production: {
    ip: process.env.IP || "0.0.0.0",
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || "127.0.0.1",
    },
  },
};


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
