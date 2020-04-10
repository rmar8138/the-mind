<template>
  <div class="player-ready">
    <h3 v-if="room.gameWon">You won! Play again?</h3>
    <h3 v-else>Ready for the next round?</h3>
    <ul v-for="player in room.players" :key="player.id">
      <li>
        <span class="player">{{ player.username }}</span>
        <span v-if="player.isReady" class="ready">Ready!</span>
        <span v-else class="not-ready">Not ready</span>
      </li>
    </ul>
    <div class="buttons">
      <button class="button" @click.prevent="handlePlayerReady">Ready</button>
      <button class="button button-grey" @click.prevent="handleLeaveRoom">Leave</button>
    </div>
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
      if (this.room.player.isReady) return;

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
h3 {
  text-align: center;
}

li {
  display: flex;
  justify-content: space-evenly;

  span {
    display: inline-block;
    width: 50%;
  }
}

.player-ready {
  /* height: 30vh; */
  width: 100vw;
  padding: $space-sm;
  position: absolute;
  bottom: 0;
  left: 0;

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

.ready .not-ready {
  text-align: left;
  margin-left: $space-sm;
}
</style>
