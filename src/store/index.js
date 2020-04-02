import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const room = {
  state: {
    roomId: null,
    players: []
  },
  mutations: {
    setRoomId(state, roomId) {
      state.roomId = roomId;
    },
    fetchPlayers(state, players) {
      state.players = players;
    },
    removePlayer(state, playerId) {
      state.players = state.players.filter(player => player.id !== playerId);
    }
  },
  actions: {
    socket_joinRoom({ commit }, payload) {
      commit("fetchPlayers", payload.players);
      commit("setRoomId", payload.roomId);
    },
    socket_leaveRoom({ commit }, payload) {
      commit("removePlayer", payload.playerId);
    }
  }
};

export default new Vuex.Store({
  modules: {
    room
  }
});
