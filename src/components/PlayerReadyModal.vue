<template>
  <div>
    <h3 v-if="room.gameWon">You won! Play again?</h3>
    <h3 v-else>Ready for the next round?</h3>
    <ul v-for="player in room.players" :key="player.id">
      <li>{{ player.username }} | <span v-if="player.isReady">Ready!</span></li>
    </ul>
    <button @click.prevent="handlePlayerReady">Ready</button>
    <button @click.prevent="handleLeaveRoom">Leave</button>
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
      if (this.room.gameWon) {
        return this.$socket.client.emit("start_round", {
          roomId: this.room.roomId,
          round: 1
        });
      }

      this.$socket.client.emit("start_round", {
        roomId: this.room.roomId,
        round: this.room.round + 1
      });
    },
    handlePlayerReady() {
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
    },
    handleLeaveRoom() {
      this.$socket.client.emit("leave_room", {
        roomId: this.room.roomId
      });
      this.$store.commit("resetState");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped></style>
