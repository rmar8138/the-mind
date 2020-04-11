<template>
  <div class="game-over">
    <h3>You lose...</h3>
    <p>
      {{ this.room.lastPlayed.player.username }} played
      {{ this.room.lastPlayed.card }}. The next card was
      {{ this.room.cards[this.room.cardsPlayed - 1] }}
    </p>
    <h3>Play again?</h3>
    <ul v-for="player in room.players" :key="player.id">
      <li>
        <span class="player">{{ player.username }}</span>
        <span v-if="player.isReady" class="ready"></span>
        <span v-else class="not-ready"></span>
      </li>
    </ul>
    <div class="buttons">
      <button class="button" @click.prevent="handlePlayerReady">Ready!</button>
      <button class="button button-grey" @click.prevent="handleLeaveRoom">Leave</button>
    </div>
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
  methods: {
    startNewRound() {
      this.$socket.client.emit("start_round", {
        roomId: this.room.roomId,
        round: 1
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

<style lang="scss" scoped>
h3,
p {
  text-align: center;
}

li {
  display: flex;
  justify-content: space-evenly;
}

button {
  background-color: $color-dark-grey;
}

.game-over {
  width: 80vw;
  padding: $space-sm;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $color-dark-grey;
  border-radius: 5px;

  & > *:not(:last-child) {
    margin-bottom: $space-sm;
  }
}

.buttons {
  font-size: $text-xs;
  display: flex;
}

.button-grey {
  color: $color-light-grey;
}

.player {
  text-align: right;
  margin-right: $space-sm;
}

.ready,
.not-ready {
  text-align: left;
  margin-left: $space-sm;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ready::after,
.not-ready::after {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}

.ready::after {
  border: 1px solid $color-success;
  background-color: $color-success;
}

.not-ready::after {
  border: 1px solid $color-light-grey;
  background-color: $color-dark-grey;
}
</style>
