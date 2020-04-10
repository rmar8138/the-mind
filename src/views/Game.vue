<template>
  <div class="game">
    <div>
      <div class="menu">
        <button class="button">Leave</button>
        <h2>Game</h2>
        <button class="button">Help</button>
      </div>
      <ul class="other-players">
        <li v-for="player in otherPlayers" :key="player.id">
          <span class="other-player">{{ player.username }}</span>
          <span class="cards-left">{{ player.cards }}</span>
        </li>
      </ul>
    </div>
    <div class="board">
      <h3>Round {{ room.round }}</h3>
      <div v-if="room.cardsPlayed > 0">
        <p>{{ room.lastPlayed.player.username }} played</p>
        <span>{{ room.lastPlayed.card }}</span>
      </div>
      <p v-else>No cards played yet</p>
    </div>
    <div class="your-cards">
      <div>
        <p v-if="room.playerCards.length >= 1">Your next card is:</p>
        <span class="next-card" @click="handleCardPlayed">{{ room.playerCards[0] }}</span>
      </div>
      <div class="cards-left" v-bind:class="{'not-visible': room.playerCards.length <= 1}">
        <p>Cards left:</p>
        <ul>
          <li v-for="card in excludeHighestCard" :key="card">{{ card }}</li>
        </ul>
      </div>
    </div>
    <PlayerReadyModal v-if="room.showPlayerReadyModal" />
    <GameOverModal v-else-if="room.showGameOverModal" />
    <UserDisconnectedModal v-else-if="room.showUserDisconnectedModal" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PlayerReadyModal from "./../components/PlayerReadyModal";
import GameOverModal from "./../components/GameOverModal";
import UserDisconnectedModal from "./../components/UserDisconnectedModal";

export default {
  name: "Game",
  components: {
    PlayerReadyModal,
    GameOverModal,
    UserDisconnectedModal
  },
  computed: {
    ...mapState(["room"]),
    ...mapGetters(["otherPlayers", "excludeHighestCard"])
  },
  methods: {
    handleCardPlayed(event) {
      // check if valid card
      // if valid card and last card played, update state
      const card = parseInt(event.target.innerHTML);

      if (card !== this.room.cards[this.room.cardsPlayed]) {
        return this.$socket.client.emit("incorrect_card", {
          roomId: this.room.roomId,
          lastPlayed: {
            player: this.room.player,
            card
          }
        });
      }

      // remove played card
      this.$store.commit("removePlayerCard", card);

      // emit events to server to update other players
      this.$socket.client.emit("correct_card", {
        roomId: this.room.roomId,
        lastPlayed: {
          player: this.room.player,
          card
        }
      });

      if (this.room.cardsPlayed === this.room.cards.length - 1) {
        // show player ready modal here
        this.$socket.client.emit("end_round", {
          roomId: this.room.roomId
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  color: $color-light-grey;
}

.game {
  position: relative;
  height: 100vh;
  padding: $space-md;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    font-size: $text-sm;
    padding: 0;
  }
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.other-players {
  display: flex;
  justify-content: center;
  margin: $space-md 0;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li:not(:last-child) {
    margin-right: $space-lg;
  }
}

.other-player {
  font-size: $text-md;
}

.cards-left {
  color: $color-light-grey;
}

.board {
  margin: $space-md 0 auto 0;
  text-align: center;

  span {
    font-size: $text-xxl;
  }
}

.your-cards {
  text-align: center;
}

.next-card {
  font-size: $text-xxl;
}

.cards-left {
  ul {
    text-align: center;
    display: flex;
    justify-content: center;

    li:not(:last-child) {
      margin-right: $space-sm;
    }
  }
}

.not-visible {
  visibility: hidden;
}
</style>