<template>
  <div>
    <h2>Lobby</h2>
    <span>Room ID: {{ room.roomId }}</span>
    <ul v-for="player in room.players" :key="player.id">
      <li>{{ player.username }}</li>
    </ul>
    <button @click.prevent="startGame">Start Game</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Lobby",
  created() {
    // get players
    // console.log(this.$socket.client);
    // if (!this.$store.state.room.roomId) {
    //   $this.router.push()
    // }
  },
  computed: {
    ...mapState(["room"])
  },
  methods: {
    startGame() {
      // push to game room
      this.$router.push("game");
      // emit game start event
      this.$socket.client.emit("start_game", {
        roomId: this.room.roomId
      });
    }
  },
  sockets: {
    error_message(payload) {
      this.$router.push({
        name: "JoinGame",
        params: {
          errorMessage: payload.message
        }
      });
    },
    start_game() {
      this.$router.push("game");
    }
  }
};
</script>
