import { model, Schema } from "mongoose";
///user schema only name and email
const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  friends: {
    type: [String],
    default: [],
  },
  conversations: {
    type: [String],
    default: [],
  },
  followers: {
    type: [String],
    default: [],
  },
  followings: {
    type: [String],
    default: [],
  },
});

export default model("User", userSchema);
