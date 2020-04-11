<template>
  <div class="lobby">
    <div>
      <div class="heading">
        <h2>Lobby</h2>
        <span>Room ID: {{ room.roomId }}</span>
      </div>
      <div class="players">
        <h3>Players</h3>
        <ul>
          <li v-for="player in room.players" :key="player.id">
            <transition>
              <span>{{ player.username }}</span>
            </transition>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <button class="button" @click.prevent="startGame">Start Game</button>
      <button class="button button-danger" @click.prevent="handleLeaveLobby">Leave</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Lobby",
  computed: {
    ...mapState(["room"])
  },
  methods: {
    startGame() {
      // push to game room
      this.$router.push("game");
      // emit game start event
      this.$socket.client.emit("start_round", {
        roomId: this.room.roomId,
        round: 1
      });
    },
    handleLeaveLobby() {
      this.$socket.client.emit("leave_room", {
        roomId: this.room.roomId
      });
      this.$store.commit("resetState");
      this.$router.push("/");
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
    },
    start_round() {
      this.$router.push("game");
    }
  }
};
</script>

<style lang="scss" scoped>
.lobby {
  text-align: center;
  padding: $space-md;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.heading {
  margin-bottom: $space-md;
}

h3 {
  color: $color-light-grey;
}

ul {
  li:not(:last-child) {
    border-bottom: 1px solid $color-dark-grey;
  }
}

li {
  font-size: $text-lg;
  padding: $space-sm;
}
</style>