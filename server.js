const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./message");
const { addUser, getCurrentUser, leave, roomList } = require("./userlist.js");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = socketio(server);

const mod = "guardian";
//to do when a new client connects
io.on("connection", (socket) => {
  console.log(`new socket connected`);

  socket.on("newUser", ({ username, room }) => {
    let user = addUser(socket.id, username, room);

    socket.join(user.room);
    //below message is sent to the client connected
    socket.emit(
      "message",
      formatMessage(mod, `${user.username}Welcome to chatty`)
    );
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(mod, `${user.username} has joined the chat`)
      );

    io.to(user.room).emit("room", {
      room: user.room,
      users: roomList(user.room),
    });
  });

  //receiving a message from a client
  socket.on("chatMessage", (msg) => {
    let user = getCurrentUser(socket.id);
    //send the received message to everyone on the room
    io.to(user.room).emit("cmessage", formatMessage(user.username, msg));
  });

  //when a client disconnects
  socket.on("disconnect", () => {
    let user = leave(socket.id);
    if(user){
      io.to(user.room).emit(
        "message",
        formatMessage(mod, `${user.username} has left the chat`)
      );

      io.to(user.room).emit("room", {
        room: user.room,
        users: roomList(user.room),
      });
    }
  });
});

const PORT = 3000 || process.env.PORT;

server.listen( process.env.PORT, () => {
  console.log("app running");
});
