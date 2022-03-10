import { model, Schema } from "mongoose";

const NotificationSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
  },
  reciver: {
    type: String,
  },
  //contextid(tableId) + reciver
  idGenerateUnique: {
    type: String,
    unique: true,
  },
  typeNotification: {
    type: {
      type: String,
    },
    //idContext(tableId)
    context: {
      type: String,
    },
  },
});

export default model("Notification", NotificationSchema);
