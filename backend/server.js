import express from "express";
import morgan from "morgan";
import glob from "glob";
import path from "path";
import chalk from "chalk";
import bodyParser from "body-parser";
import jwt from "express-jwt";
import settings from "./util/settings.js";
import database from "./util/database.js";

/**
 * patch express async errors handling
 */
import "express-async-errors";

/**
 * Init web server
 */
const app = express();
morgan.token("user_email", function (req) {
  return req.user && (req.user.username || req.user.email);
});
morgan.token("user_id", function (req) {
  return req.user && req.user.id;
});
morgan.token("app_version", function (req) {
  return req.headers && req.headers["x-app-version"];
});
morgan.token("device", function (req) {
  return req.headers && req.headers["x-device"];
});
app.use("/api/", morgan(settings.constants.web.logFormat));

app.use(bodyParser.json());

/**
 * Handle Options requests
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, X-Device, X-App-Version"
  );
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get(["/", "/health"], async (req, res) => {
  await database.authenticate();
  res.json({
    status: database["database_error"] || "UP",
  });
});

/**
 * Protect paths
 */
app.use("/api/auth/me", jwt(Object.assign({ credentialsRequired: false }, settings.jwt)));
app.use("/api/protected", jwt(settings.jwt));

/**
 * Apply all routes from api folder
 */
Promise.all(
  glob
    .sync("./api/**/[^._]*.js")
    .map(async (file) => app.use(path.dirname(file.slice(1)), (await import(file)).default))
);
/**
 * Error handler
 */
app.use((err, req, res, next) => {
  switch (err.name) {
    case "AppError":
      console.debug(
        chalk.yellow("AppError"),
        chalk.yellow(err.message),
        "at .../" + err.stack.split("\n")[1].split(/[\\/]/).slice(-3).join("/").slice(0, -1)
      );
      res.status(err.status || 400);
      res.json({
        error: {
          name: err.name,
          message: err.message,
          field: err.params && err.params.field,
          params: err.params,
        },
      });
      break;
    case "UnauthorizedError":
      console.debug(chalk.yellow("UnauthorizedError"), chalk.yellow(err.message));
      res.status(err.status || 401);
      res.json({
        error: err,
      });
      break;
    case "SequelizeValidationError":
      if (err.errors) {
        err.errors.forEach((e) => console.debug(chalk.yellow("ValidationError"), chalk.yellow(e.message)));
      }
      res.status(err.status || 400);
      res.json({
        error: err.errors
          ? err.errors.map((e) => ({
              name: err.name,
              message: e.message,
              code: e.validatorKey,
              field: e.path,
              params: e.validatorArgs,
            }))
          : err,
      });
      break;
    default:
      console.error(chalk.bold.red("Technical error " + err.name), chalk.red(err.message), err);
      res.status(err.status || 500);
      res.json({
        error: err,
      });
  }
  next();
});

/**
 * start server
 */
app.listen(settings.constants.web.port, () =>
  console.log(chalk.green(`API server (re-)started on port ${settings.constants.web.port}`))
);

process.on("SIGINT", () => {
  console.log("Stopping...");
  process.exit();
});
