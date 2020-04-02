const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(8000, () => console.log("Server up on port 8000"));

io.on("connection", function(socket) {
  // socket.emit("news", { hello: "world" });
  // socket.on("my other event", function(data) {
  //   console.log(data);
  // });
  console.log(socket.id);
  socket.emit("message", "hello");
});
