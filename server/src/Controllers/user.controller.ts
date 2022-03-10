import User from "./../Models/User";
import { RequestHandler } from "express";

export const createUser: RequestHandler = async (req, res) => {
  const user = await new User(req.body);
  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const validateUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(301).json("user not found");
    if (user) {
      const validate = req.body.password === user.password;
      !validate && res.status(301).json("username or password is incorrect");
      if (user && validate) {
        const onlyUser = {
          username: user.username,
          id: user._id,
        };
        res.status(200).json(onlyUser);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    if (!user) {
      res.status(404).send();
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const addFriend: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userFriend = await User.findById(req.body.id);
    let friendInclude = user.friends.includes(req.body.id);
    if (!friendInclude && userFriend && user) {
      user.friends.push(req.body.id);
      userFriend.friends.push(req.params.id);
      user.save();
      userFriend.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
