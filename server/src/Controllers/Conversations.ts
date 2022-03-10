import { RequestHandler } from "express";
import Conversation from "../Models/Conversation";
//create conversation
export const createConversation: RequestHandler = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.firstUserId, req.body.secondUserId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get conversations of a user
export const getConversation: RequestHandler = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get conversation including two users
export const getConversationActual: RequestHandler = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
