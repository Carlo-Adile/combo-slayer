// score.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    score: 0 // Inizializza il punteggio a 0
  },
  mutations: {
    // Aggiorna il punteggio
    updateScore(state, newScore) {
      state.score = newScore;
    }
  },
  actions: {
    // Azione per aggiornare il punteggio
    updateScore({ commit }, newScore) {
      commit('updateScore', newScore);
    }
  },
  getters: {
    // Getter per ottenere il punteggio corrente
    getScore(state) {
      return state.score;
    }
  }
});
