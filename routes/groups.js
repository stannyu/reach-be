import express from "express";
import { Group, validateGroup } from "../models/groups.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const gr = await Group.find().sort("title").limit(10);
  res.send(gr);
});

router.post("/", async (req, res) => {
  const { error } = validateGroup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let group;

  group = new Group({
    title: req.body.title,
  });

  group = await group.save();
  res.send(group);
});

router.delete("/:id", async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group)
    return res
      .status(404)
      .send(`group with id: ${req.params.id} wasn't found`);

  await group.deleteOne({_id: req.params.id});
  res.send(group);
});

export { router as groups };
