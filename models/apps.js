import mongoose from "mongoose";
import Joi from "joi";

const APPS_MODEL = "app";
const APPS_COLLECTION = "apps";

const appSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 5000,
    },
  },
  { collection: APPS_COLLECTION }
);

const App = mongoose.model(APPS_MODEL, appSchema);

function validateApp(app) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(5000).required(),
  });
  return schema.validate(app);
}

export { App, validateApp, APPS_COLLECTION, APPS_MODEL };
