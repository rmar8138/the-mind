import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const initialState = () => ({
  player: {
    id: "",
    username: ""
  },
  roomId: null,
  round: 1,
  players: [],
  playerCards: [],
  cards: [],
  cardsPlayed: 0,
  lastPlayed: {
    username: null,
    card: null
  },
  gameInProgress: false,
  gameWon: false,
  showPlayerReadyModal: false,
  showGameOverModal: false,
  showUserDisconnectedModal: false
});

const room = {
  state: initialState,
  getters: {
    readyCount: state => {
      return state.players.filter(player => player.isReady).length;
    },
    otherPlayers: state => {
      return state.players.filter(player => player.id !== state.player.id);
    },
    excludeHighestCard: state => {
      return state.playerCards.slice(1);
    }
  },
  mutations: {
    setPlayer(state, player) {
      state.player = player;
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
    decrementPlayerCardCount(state, id) {
      state.players = state.players.map(player => {
        if (player.id === id) {
          return {
            ...player,
            cards: (player.cards -= 1)
          };
        }

        return player;
      });
    },
    togglePlayerReadyModal(state) {
      state.showPlayerReadyModal = !state.showPlayerReadyModal;
    },
    updatePlayerReady(state, id) {
      if (state.player.id === id) {
        state.player = {
          ...state.player,
          isReady: true
        };
      }

      state.players = state.players.map(player => {
        if (player.id === id) {
          return {
            ...player,
            isReady: true
          };
        }

        return player;
      });
    },
    clearAllPlayerReady(state) {
      state.player = {
        ...state.player,
        isReady: false
      };

      state.players = state.players.map(player => ({
        ...player,
        isReady: false
      }));
    },
    toggleGameOverModal(state) {
      state.showGameOverModal = !state.showGameOverModal;
    },
    toggleUserDisconnectedModal(state) {
      state.showUserDisconnectedModal = !state.showUserDisconnectedModal;
    },
    toggleGameInProgress(state) {
      state.gameInProgress = !state.gameInProgress;
    },
    resetState(state) {
      const initial = initialState();
      Object.keys(initial).forEach(key => {
        state[key] = initial[key];
      });
    },
    toggleGameWon(state) {
      state.gameWon = !state.gameWon;
    }
  },
  actions: {
    socket_joinRoom({ commit }, payload) {
      commit("fetchPlayers", payload.players);
      commit("setRoomId", payload.roomId);
    },
    socket_leaveRoom({ commit, state }, payload) {
      commit("removePlayer", payload.playerId);

      if (state.gameInProgress) {
        // show user disconnected modal
        commit("toggleUserDisconnectedModal");
      }
    },
    socket_startRound({ commit, state }, payload) {
      commit("toggleGameInProgress");
      commit("setRoundCards", payload.cards);
      commit("setRound", payload.round);
      commit("resetCardsPlayed");
      commit("resetLastPlayed");
      commit("setPlayerCardCount");

      if (state.showPlayerReadyModal) {
        // dont run these before first round
        commit("clearAllPlayerReady");
        commit("togglePlayerReadyModal");
      }

      if (state.showGameOverModal) {
        // dont run these before first round
        commit("clearAllPlayerReady");
        commit("toggleGameOverModal");
      }

      if (payload.round === 1 && state.gameWon) {
        // new game after win, toggle gameWon
        commit("toggleGameWon");
      }
    },
    socket_assignCards({ commit }, payload) {
      commit("assignCards", payload.playerCards);
    },
    socket_correctCard({ commit }, payload) {
      commit("setLastPlayed", payload.lastPlayed);
      commit("incrementCardsPlayed");
      commit("decrementPlayerCardCount", payload.lastPlayed.player.id);
    },
    socket_incorrectCard({ commit }, payload) {
      commit("toggleGameInProgress");
      commit("setLastPlayed", payload.lastPlayed);
      commit("incrementCardsPlayed");
      commit("decrementPlayerCardCount", payload.lastPlayed.player.id);
      commit("toggleGameOverModal");
    },
    socket_endRound({ commit, state }) {
      if (state.round === 12) {
        commit("toggleGameWon");
      }

      commit("toggleGameInProgress");
      commit("togglePlayerReadyModal");
    },
    socket_playerReady({ commit }, payload) {
      commit("updatePlayerReady", payload.id);
    }
  }
};

export default new Vuex.Store({
  modules: {
    room
  }
});
