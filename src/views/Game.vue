<template>
  <div>
    <h2>Game</h2>
    <span>Room ID: {{ roomId }}</span>
    <ul v-for="player in players" :key="player.id">
      <li>{{ player.username }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Game",
  computed: {
    roomId() {
      return this.$store.state.room.roomId;
    },
    players() {
      return this.$store.state.room.players;
    }
  }
};
</script>
