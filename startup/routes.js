import express from "express";
import helmet from "helmet";
import cors from "cors";

import { home } from "../routes/home.js";
import { todos } from "../routes/todos.js";
import { groups } from "../routes/groups.js";
import { apps } from "../routes/apps.js";

const routesInit = (app) => {
  //MIDDLEWARE
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  app.use(cors());

  app.use("/", home);
  app.use("/groups", groups);
  app.use("/todos", todos);
  app.use("/apps", apps);
};

export { routesInit };
