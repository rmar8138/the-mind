<template>
  <div>
    <div class="game" v-bind:class="{disabled: modalOpen}">
      <div>
        <div class="menu">
          <button class="button">Leave</button>
          <h2>Game</h2>
          <button class="button" @click.prevent="toggleHelpDrawer">Help</button>
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
          <p class="you-won" v-if="room.showPlayerReadyModal">You won!</p>
        </div>
        <p v-else>No cards played yet</p>
      </div>
      <div class="your-cards">
        <div v-if="room.playerCards.length >= 1">
          <p>Your next card is:</p>
          <span class="next-card" @click="handleCardPlayed">{{ room.playerCards[0] }}</span>
          <span class="play-action">Touch to play</span>
        </div>
        <div class="cards-left" v-bind:class="{'not-visible': room.playerCards.length <= 1}">
          <p>Cards left:</p>
          <ul>
            <li v-for="card in excludeHighestCard" :key="card">{{ card }}</li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade-up">
      <PlayerReadyModal v-if="room.showPlayerReadyModal" />
      <GameOverModal v-else-if="room.showGameOverModal" />
      <UserDisconnectedModal v-else-if="room.showUserDisconnectedModal" />
    </transition>
    <transition name="slide-in-right">
      <HelpDrawer v-if="room.showHelpDrawer" />
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PlayerReadyModal from "./../components/PlayerReadyModal";
import GameOverModal from "./../components/GameOverModal";
import UserDisconnectedModal from "./../components/UserDisconnectedModal";
import HelpDrawer from "./../components/HelpDrawer";

export default {
  name: "Game",
  components: {
    PlayerReadyModal,
    GameOverModal,
    UserDisconnectedModal,
    HelpDrawer
  },
  computed: {
    ...mapState(["room"]),
    ...mapGetters(["otherPlayers", "excludeHighestCard", "modalOpen"])
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
    },
    toggleHelpDrawer() {
      this.$store.commit("toggleHelpDrawer");
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

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: $space-sm;
  }
}

.next-card {
  font-size: $text-xxl;
}

.play-action {
  color: $color-light-grey;
  font-size: $text-sm;
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

.you-won {
  font-size: $text-xxl;
}

.not-visible {
  visibility: hidden;
}

.disabled {
  pointer-events: none;
}

// transitions //

.fade-up-enter-active {
  transition: all 0.75s cubic-bezier(0.25, 1, 0.5, 1) 1s;
}

.fade-up-leave-active {
  transition: all 0.75s cubic-bezier(0.5, 0, 0.75, 0);
}

.fade-up-enter,
.fade-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -30%);
}

.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-in-right-enter,
.slide-in-right-leave-to {
  transform: translateX(100%);
}
</style>