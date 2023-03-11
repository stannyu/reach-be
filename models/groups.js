import mongoose from "mongoose";
import Joi from "joi";

const GROUP_MODEL = "group";
const GROUP_COLLECTION = "groups";

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 5000,
    },
  },
  { collection: GROUP_COLLECTION }
);

const Group = mongoose.model(GROUP_MODEL, groupSchema);

function validateGroup(group) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(5000).required(),
  });
  return schema.validate(group);
}

export { Group, validateGroup, GROUP_COLLECTION, GROUP_MODEL };
