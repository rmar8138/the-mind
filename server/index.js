const shortid = require("shortid");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const rooms = {
  full: {
    players: [1, 2, 3, 4]
  }
};

server.listen(8000, () => console.log("Server up on port 8000"));

io.on("connection", function(socket) {
  socket.on("create_room", payload => {
    const roomId = shortid.generate();
    rooms[roomId] = {
      players: [payload.player]
    };

    socket.join(roomId);

    io.to(roomId).emit("create_room", { roomId });
    io.to(roomId).emit("join_room", {
      roomId,
      players: [payload.player]
    });
  });

  socket.on("join_room", payload => {
    // find room
    // if room exists, push user into users array
    // socket.join

    // if room doesnt exist, emit error

    if (!rooms[payload.roomId]) {
      return socket.emit("error_message", {
        message: "Room doesn't exist"
      });
    }

    if (rooms[payload.roomId].players.length >= 4) {
      return socket.emit("error_message", {
        message: "Room is already full"
      });
    }

    rooms[payload.roomId].players.push(payload.player);
    socket.join(payload.roomId);
    console.log(JSON.stringify(rooms[payload.roomId], null, 2));

    io.to(payload.roomId).emit("join_room", {
      roomId: payload.roomId,
      players: rooms[payload.roomId].players
    });
  });

  socket.on("disconnecting", () => {
    // remove player from all room
    for (room in socket.rooms) {
      if (rooms[room]) {
        rooms[room].players = rooms[room].players.filter(
          player => player.id !== socket.id
        );

        io.to(room).emit("leave_room", {
          playerId: socket.id
        });
      }
    }
  });
});
