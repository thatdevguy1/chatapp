const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

const port = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/users", require("./routes/api/users"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = require("./config/socket").init(server);

io.on("connection", (socket) => {
  console.log(`user has connected: `, socket.id);
  socket.on("new message", (msg) => {
    socket.broadcast.emit("update chat", msg);
  });
});
