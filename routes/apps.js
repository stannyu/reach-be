import express from "express";
import { App, validateApp } from "../models/apps.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const appsList = await App.find().sort("title").limit(10);
  res.send(appsList);
});

router.post("/", async (req, res) => {
  const { error } = validateApp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let app;

  app = new App({
    title: req.body.title,
  });

  app = await app.save();
  res.send(app);
});

// router.delete("/:id", async (req, res) => {
//   const group = await Group.findById(req.params.id);
//   if (!group)
//     return res
//       .status(404)
//       .send(`group with id: ${req.params.id} wasn't found`);

//   await group.deleteOne({_id: req.params.id});
//   res.send(group);
// });

export { router as apps };
