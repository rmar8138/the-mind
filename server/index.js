const shortid = require("shortid");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { generateCards } = require("./utils");

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
      players: [payload.player],
      gameStarted: false
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

    if (rooms[payload.roomId].gameStarted) {
      return socket.emit("error_message", {
        message: "Game has already started"
      });
    }

    rooms[payload.roomId].players.push(payload.player);
    socket.join(payload.roomId);

    io.to(payload.roomId).emit("join_room", {
      roomId: payload.roomId,
      players: rooms[payload.roomId].players
    });
  });

  socket.on("start_game", payload => {
    // payload must contain roomId
    rooms[payload.roomId].gameStarted = true;
    rooms[payload.roomId].round = 4;

    //set up game object here
    const { cards, playerCards } = generateCards({
      players: rooms[payload.roomId].players,
      round: rooms[payload.roomId].round
    });

    // send cards to each player
    io.in(payload.roomId).clients((error, clients) => {
      if (error) {
        throw new Error(error);
      }

      console.log(cards);

      clients.forEach((client, index) => {
        io.to(client).emit("assign_cards", {
          playerCards: playerCards[index]
        });
      });
    });

    io.to(payload.roomId).emit("start_game", {
      cards,
      playerCards
    });
  });

  socket.on("correct_card", payload => {
    // payload should have card and player who oplayed

    socket.emit("correct_card", payload);
  });

  socket.on("incorrect_card", payload => {
    // payload should have card and player who played

    socket.emit("incorrect_card", payload);
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
