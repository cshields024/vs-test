import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  todo: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: true
  }
})

export default model("Todo", todoSchema)