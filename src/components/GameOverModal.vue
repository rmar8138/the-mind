<template>
  <div>
    <h3>You lose...</h3>
    <p>
      {{ this.room.lastPlayed.player.username }} played
      {{ this.room.lastPlayed.card }}. The next card was
      {{ this.room.cards[this.room.cardsPlayed - 1] }}
    </p>
    <h3>Play again?</h3>
    <ul v-for="player in room.players" :key="player.id">
      <li>{{ player.username }} | <span v-if="player.isReady">Ready!</span></li>
    </ul>
    <button @click.prevent="handlePlayerReady">Ready!</button>
    <button @click.prevent="handleLeaveRoom">Leave</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "GameOverModal",
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
        round: 1
      });
    },
    handlePlayerReady() {
      this.$socket.client.emit("player_ready", {
        roomId: this.room.roomId,
        id: this.room.player.id
      });
    },
    handleLeaveRoom() {
      this.$socket.client.emit("leave_room", {
        roomId: this.room.roomId
      });
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped></style>
