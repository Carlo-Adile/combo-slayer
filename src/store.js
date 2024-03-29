import { createStore } from 'vuex';

export default createStore({
  //definire lo stato iniziale
  state: {
    //la proprietà chiave!
    gameState: 'preGame',
  },
  //modificare lo stato
  mutations: {
    setGameState(state, newState){
      state.gameState = newState;
    }
  },
  //azioni per mutare lo stato
  actions: {
    updateGameState({ commit }, newState){
      commit('setGameState', newState);
    }
  },
  //getter per ottenere lo stato corrente
  getters: {
    getGameState(state) {
      return state.gameState
    }
  }
})