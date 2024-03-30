import { createStore } from 'vuex';

export default createStore({
  state: {
    gameState: 'preGame',
    score: 0
  },
  mutations: {
    setGameState(state, newState) {
      state.gameState = newState;
    },
    increaseScore(state, addScore) {
      state.score += addScore;
    },
    resetScore(state){
      state.score = 0;
    }
  },
  actions: {
    updateGameState({ commit }, newState) {
      commit('setGameState', newState);
    },
    updateScore({ commit }, addScore) {
      commit('increaseScore', addScore);
    },
    resetScore({ commit }){
      commit('resetScore');
    }
  },
  getters: {
    getGameState(state) {
      return state.gameState;
    },
    getScore(state) {
      return state.score;
    }
  }
})
