const express = require("express");
const Message = require("../models/message");
const messageRouter = express.Router();

messageRouter.post("/get-messages", async (req, res) => {
  try {
    const { room } = req.body;
    let message = await Message.find(room);
    res.json(message);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = messageRouter;
