<template>
  <div>
    <h2>Game</h2>
    <span>Room ID: {{ room.roomId }}</span>
    <span>Round {{ room.round }}</span>
    <ul v-for="player in room.players" :key="player.id">
      <li>{{ player.username }} has {{ player.cards }} cards left</li>
    </ul>
    <div v-if="room.cardsPlayed > 0">
      {{ room.lastPlayed.player.username }} played a {{ room.lastPlayed.card }}
    </div>
    <ul v-for="card in room.playerCards" :key="card">
      <li @click="handleCardPlayed" value="card">{{ card }}</li>
    </ul>
    <PlayerReadyModal v-if="room.showPlayerReadyModal" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import PlayerReadyModal from "./../components/PlayerReadyModal";

export default {
  name: "Game",
  components: {
    PlayerReadyModal
  },
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
