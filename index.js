import express from "express";
import config from "config";
import { routesInit } from "./startup/routes.js";
import dbInitialization from "./startup/db.js";

const app = express();

dbInitialization();
routesInit(app);

const port = process.env.PORT || config.get("PORT");
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

export default server;
