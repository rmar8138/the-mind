import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const room = {
  state: {
    username: "",
    roomId: null,
    round: 1,
    players: [],
    playerCards: [],
    cards: [],
    cardsPlayed: 0,
    lastPlayed: {
      username: null,
      card: null
    }
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setRoomId(state, roomId) {
      state.roomId = roomId;
    },
    fetchPlayers(state, players) {
      state.players = players;
    },
    removePlayer(state, playerId) {
      state.players = state.players.filter(player => player.id !== playerId);
    },
    assignCards(state, playerCards) {
      state.playerCards = playerCards;
    },
    setRoundCards(state, cards) {
      state.cards = cards;
    },
    incrementCardsPlayed(state) {
      state.cardsPlayed += 1;
    },
    resetCardsPlayed(state) {
      state.cardsPlayed = 0;
    },
    incrementRound(state) {
      state.round += 1;
    },
    setRound(state, round) {
      state.round = round;
    },
    removePlayerCard(state, card) {
      state.playerCards = state.playerCards.filter(
        playerCard => playerCard !== card
      );
    },
    setLastPlayed(state, lastPlayed) {
      state.lastPlayed = lastPlayed;
    },
    resetLastPlayed(state) {
      state.lastPlayed = {
        username: null,
        card: null
      };
    },
    setPlayerCardCount(state) {
      state.players = state.players.map(player => ({
        ...player,
        cards: state.round
      }));
    },
    decrementPlayerCardCount(state, username) {
      state.players = state.players.map(player => {
        if (player.username === username) {
          return {
            ...player,
            cards: (player.cards -= 1)
          };
        }

        return player;
      });
    }
  },
  actions: {
    socket_joinRoom({ commit }, payload) {
      commit("fetchPlayers", payload.players);
      commit("setRoomId", payload.roomId);
    },
    socket_leaveRoom({ commit }, payload) {
      commit("removePlayer", payload.playerId);
    },
    socket_startRound({ commit }, payload) {
      commit("setRoundCards", payload.cards);
      commit("setRound", payload.round);
      commit("resetCardsPlayed");
      commit("resetLastPlayed");
      commit("setPlayerCardCount");
    },
    socket_assignCards({ commit }, payload) {
      commit("assignCards", payload.playerCards);
    },
    socket_correctCard({ commit }, payload) {
      commit("setLastPlayed", payload.lastPlayed);
      commit("incrementCardsPlayed");
      commit("decrementPlayerCardCount", payload.lastPlayed.username);
    }
  }
};

export default new Vuex.Store({
  modules: {
    room
  }
});
