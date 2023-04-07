import express from "express";
import { Todo, validateTodo} from "../models/todos.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find().sort("title").limit(10);
  res.send(todos);
});

router.get("/bygroup", async (req, res) => {
    const todos = await Todo.find({group: req.query.group}).sort("title").limit(10);
    res.send(todos);
  });

router.post("/", async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo;

  todo = new Todo({
    title: req.body.title,
    completed: false,
    group: req.body.group
  });

  todo = await todo.save();
  res.send(todo);
});

router.put('/:id',  async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).send(error.message);
  
    const updateParam = {
      title: req.body.title,
      completed: req.body.completed,
      group: req.body.group
    };
  
    let todo = await Todo.find({_id: req.params.id});
    if (!todo) return res.status(404).send(`Todo with id: ${req.params.id} wasn't found`);
  
    todo = await Todo.findByIdAndUpdate(req.params.id, updateParam, { new: true });
  
    res.send(todo);
  });

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo)
    return res
      .status(404)
      .send(`todo with id: ${req.params.id} wasn't found`);

  await todo.deleteOne({_id: req.params.id});
  res.send(todo);
});

export { router as todos };
