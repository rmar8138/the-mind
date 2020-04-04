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
  methods: {
    startNewRound() {
      this.$socket.client.emit("start_round", {
        roomId: this.room.roomId,
        round: this.room.round + 1
      });
    },
    handleButtonClick() {
      // refactor this!!!
      if (this.readyCount + 1 === this.room.players.length) {
        // last person to be ready
        this.$socket.client.emit("player_ready", {
          roomId: this.room.roomId,
          id: this.room.player.id
        });

        return this.startNewRound();
      }

      this.$socket.client.emit("player_ready", {
        roomId: this.room.roomId,
        id: this.room.player.id
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
