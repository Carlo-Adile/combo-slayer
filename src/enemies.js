import { reactive } from 'vue';

export const enemies = reactive ([
  {
    "id": 1,
    "name": "Goblin",
    "maxHealth": 30,
    "health": 30
  },
  {
    "id": 2,
    "name": "Skeleton",
    "maxHealth": 20,
    "health": 20
  },
  {
    "id": 3,
    "name": "Bat",
    "maxHealth": 10,
    "health": 10
  }
]);

/* prova stato reattivo:

export default {
  state: {
    enemies: [
      {
        "id": 1,
        "name": "Goblin",
        "maxHealth": 30,
        "health": 30
      },
      {
        "id": 2,
        "name": "Skeleton",
        "maxHealth": 20,
        "health": 20
      },
      {
        "id": 3,
        "name": "Bat",
        "maxHealth": 10,
        "health": 10
      }
    ],
    currentEnemy: null
  },
  mutations: {
    setCurrentEnemy(state, enemy){
      state.currentEnemy = enemy;
    }
  },
  actions: {
    chooseRandomEnemy({ state, commit}) {
      console.log("Enemies sta producendo un nemico...");
      const randomIndex = Math.floor(Math.random() * state.enemies.length);
      const randomEnemy = state.enemies[randomIndex];
      commit('setCurrentEnemy', randomEnemy);
    },
    applyDamage({ state, commit }, damage) {
      console.log("Enemies legge damage traslato da Rounds: ", damage);
      state.currentEnemy.health -= damage;
      if (state.currentEnemy.health <= 0) {
        commit('defeatEnemy');
      }
    },
    defeatEnemy({ dispatch }) {
      console.log("defeatEnemy richiamata!");
      dispatch('chooseRandomEnemy');
    }
  }
}

*/

