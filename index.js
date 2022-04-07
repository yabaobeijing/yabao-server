// IMPORTS
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const Message = require("./models/message");
const messageRouter = require("./routers/messageRouter");
const cors = require("cors");

// CREATING A SERVER
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io")(server);

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(messageRouter);

// CONSTANTS
const DB =
  "mongodb+srv://yabao:yabao123@cluster0.wfh5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Listening to socket io events from the client (flutter code)
io.on("connection", (socket) => {
  socket.on("message", async ({ text, user, room, type }) => {
    socket.join(room);
    // getting and formatting the date
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const today2 = dd + "/" + mm + "/" + yyyy;

    let message = new Message();
    message.user = user;
    message.text = text;
    message.room = room;
    message.date = today2;
    message.type = type;
    io.to(room).emit("newMessage", message);
    message = await message.save();
  });
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((e) => {
    console.log(e);
  });

// Listen to server
server.listen(port, "0.0.0.0", () => {
  console.log(`Server started and running on port ${port}`);
});
