<template>
  <div>
    <h2>Game</h2>
    <span>Room ID: {{ room.roomId }}</span>
    <span>Round {{ room.round }}</span>
    <ul v-for="player in room.players" :key="player.id">
      <li>{{ player.username }}</li>
    </ul>
    <div v-if="room.cardsPlayed > 0">
      {{ room.lastPlayed.username }} played a {{ room.lastPlayed.card }}
    </div>
    <ul v-for="card in room.playerCards" :key="card">
      <li @click="handleCardPlayed" value="card">{{ card }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Game",
  computed: {
    ...mapState(["room"])
  },
  methods: {
    handleCardPlayed(event) {
      // check if valid card
      // if valid card and last card played, update state
      const card = parseInt(event.target.innerHTML);

      if (card !== this.room.cards[this.room.cardsPlayed]) {
        // incorrect card
        return console.log("WRONG CARD");
      }

      // remove played card
      this.$store.commit("removePlayerCard", card);

      // emit events to server to update other players
      this.$socket.client.emit("correct_card", {
        roomId: this.room.roomId,
        lastPlayed: {
          username: this.room.username,
          card
        }
      });

      if (this.room.cardsPlayed === this.room.cards.length - 1) {
        // next round
        this.$store.commit("incrementRound");
        this.$socket.client.emit("start_round", {
          roomId: this.room.roomId,
          round: this.room.round
        });
      }
    }
  }
};
</script>
