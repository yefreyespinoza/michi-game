import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  users: {
    type: [String, String],
    default: [],
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

export default model("Message", MessageSchema);
