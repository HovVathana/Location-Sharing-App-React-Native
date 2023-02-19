const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require("socket.io")(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let userLocation = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("userLocation", (data) => {
    // console.log(data);
    let userLocationCopy = userLocation;
    let index = userLocation.findIndex((obj) => obj.id === data.id);
    let existUser = index !== -1;
    if (existUser) {
      userLocation[index] = data;
    } else {
      userLocation.push(data);
    }
    console.log(userLocation);

    socketIO.emit("receiveUser", userLocation);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json("hehe");
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
