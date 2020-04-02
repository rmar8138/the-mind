<template>
  <div>
    <h2>Lobby</h2>
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
  },
  computed: {
    players() {
      return this.$store.state.room.players;
    }
  }
};
</script>
