const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const fetch = require("node-fetch");
const { appendFile } = require("fs");
require("dotenv").config();

const { MONGO_URI } = process.env;

const { MongoClient } = require("mongodb");
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const getEmail = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  let result = "";
  try {
    await client.connect();
    const db = client.db("ZepFinalPro");
    const result = await db.collection("users").find({}).toArray();
    return res
      .status(200)
      .json({ status: 200, data: result, message: "success" });
  } catch (err) {
    res.status(400).json({ status: 400, data: result, message: "error" });
  } finally {
    client.close();
  }
};

const getUserName = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ZepFinalPro");
    const result = await db.collection("users").find({}).toArray();
    return res
      .status(200)
      .json({ status: 200, data: result, message: "success" });
  } catch (err) {
    res.status(400).json({ status: 400, data: result, message: "error" });
  } finally {
    client.close();
  }
};

const addComment = async (req, res) => {
  const { userId, comment } = req.body;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ZepFinalPro");
    const result = await db.collection("comments").insertOne(req.body);
    res.status(201).json({ status: 201, data: result });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getUserComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { userId } = req.params;
    await client.connect();
    const db = client.db("ZepFinalPro");
    const result = await db.collection("comments").find({ userId }).toArray();
    return res
      .status(200)
      .json({ status: 200, data: result, message: "success" });
  } catch (err) {
    res.status(400).json({ status: 400, data: result, message: "error" });
  } finally {
    client.close();
  }
};
const updateUser = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ZepFinalPro");
    const result = await db
      .collection("users")
      .updateOne({ id: _id }, { $set: { ...req.body } });

    return res.status(200).json({
      status: 200,
      message: "user info updated",
    });
  } catch (err) {
    res.status(400).json({ status: 400, data: result, message: "error" });
  } finally {
    client.close();
  }
};
const deleteUser = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ZepFinalPro");
    await db.collection("users").deleteOne({ _id });
    return res.status(200).json({
      status: 200,
      message: "user deleted",
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, data: reservations, message: "ID not found" });
  } finally {
    client.close();
  }
};

const addUser = async (req, res) => {
  const { userName, email } = req.body;
  const user = {
    userName,
    email,
  };
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ZepFinalPro");
    const result = await db.collection("users").insertOne(user);
    res.status(201).json({ status: 201, data: result });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  getEmail,
  addUser,
  getUserName,
  getUserComments,
  updateUser,
  deleteUser,
  addComment,
};
