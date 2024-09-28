const express = require("express");
const PORT = 3000;
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/views"));

io.on("connection", (socket) => {
  socket.on("begin-path", (data) => {
    io.emit("begin-path", data);
  });

  socket.on("draw-stroke", (data) => {
    io.emit("draw-stroke", data);
  });

  socket.on("undo", (data) => {
    io.emit("undo", data);
  });

  socket.on("redo", (data) => {
    io.emit("redo", data);
  });
});

app.get("/", (req, res) => {
  return res.render("index");
});

server.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
