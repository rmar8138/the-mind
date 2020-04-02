<template>
  <div>
    <h2>Lobby</h2>
    <span>Room ID: {{ roomId }}</span>
    <ul v-for="player in players" :key="player.id">
      <li>{{ player.username }}</li>
    </ul>
  </div>
</template>

<script>
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
    roomId() {
      return this.$store.state.room.roomId;
    },
    players() {
      return this.$store.state.room.players;
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
    }
  }
};
</script>
