<template>
  <div>
    <h3>Ready for the next round?</h3>
    <ul v-for="player in room.players" :key="player.id">
      <li>{{ player.username }}</li>
    </ul>
    <button>Ready</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlayerReadyModal",
  computed: {
    ...mapState(["room"])
  },
  methods: {
    startNewRound() {
      this.$store.commit("incrementRound");
      this.$socket.client.emit("start_round", {
        roomId: this.room.roomId,
        round: this.room.round
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
