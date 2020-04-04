<template>
  <div>
    <h3>Ready for the next round?</h3>
    <ul v-for="player in room.players" :key="player.id">
      <li>{{ player.username }} | <span v-if="player.isReady">Ready!</span></li>
    </ul>
    <button @click.prevent="handleButtonClick">Ready</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PlayerReadyModal",
  computed: {
    ...mapState(["room"]),
    ...mapGetters(["readyCount"])
  },
  watch: {
    readyCount(count) {
      if (count === this.room.players.length) {
        this.startNewRound();
      }
    }
  },
  methods: {
    startNewRound() {
      this.$store.commit("incrementRound");
      this.$socket.client.emit("start_round", {
        roomId: this.room.roomId,
        round: this.room.round
      });
    },
    handleButtonClick() {
      this.$socket.client.emit("player_ready", {
        roomId: this.room.roomId,
        id: this.room.player.id
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
