import { model, Schema } from "mongoose";
const Conversation = new Schema(
  {
    members: {
      type: [String, String],
    },
  },
  { timestamps: true }
);
export default model("Conversation", Conversation);
