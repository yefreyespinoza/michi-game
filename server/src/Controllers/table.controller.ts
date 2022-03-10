import { RequestHandler } from "express";
import Table from "../Models/Table";

export const createTable: RequestHandler = async (req, res) => {
  try {
    const table = await new Table({
      name: req.body.tableName,
      users: [req.body.userId],
      turn: req.body.userId,
    });
    await table.save();
    res.status(200).json(table);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get table of a only user

export const getMyTables: RequestHandler = async (req, res) => {
  try {
    const tables = await Table.find({ users: { $all: [req.params.userId] } });
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTableNow: RequestHandler = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    res.status(200).json(table);
  } catch (err) {
    console.log(err);
  }
};

//update table

export const updateTable: RequestHandler = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(table);
  } catch (err) {
    console.log(err);
  }
};
export const deleteTable: RequestHandler = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    res.status(200).json(table);
  } catch (err) {
    console.log(err);
  }
};
