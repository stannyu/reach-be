import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

import { GROUP_MODEL } from "./groups.js";

const TODO_MODEL = "todo";
const TODO_COLLECTION = "todos";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 5000,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: GROUP_MODEL,
      required: true,
    },
  },
  { collection: TODO_COLLECTION }
);

const Todo = mongoose.model(TODO_MODEL, todoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(5000).required(),
    completed: Joi.bool().required(),
    group: myJoiObjectId().required(),
  });
  return schema.validate(todo);
}

export { Todo, validateTodo, TODO_COLLECTION, TODO_MODEL };
