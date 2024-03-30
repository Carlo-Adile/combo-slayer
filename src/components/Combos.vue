<!-- set active combo -->
<script>
import { combos } from '../combos.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Combos",
  data() {
    return {
      combos,
      currentCombo: {},
      currentComboKeys: [],
      userInput: [],
      index: 0
    }
  },
  computed: {
    ...mapGetters(['getGameState'])
  },
  methods: {
    /* assegna nuova combo, resetta il resettabile */
    chooseRandomCombo() {
      const randomIndex = Math.floor(Math.random() * combos.length);
      this.currentCombo = combos[randomIndex];
      this.userInput = [];
      this.currentComboKeys = [];
      this.index = 0;

      console.log("la nuova combo è...", this.currentCombo.name);
    },
    //aggiungi input del player in un array e aggiungi input corretti della combo attuale in un array
    handleKeyDown(event) {
      if (this.getGameState === 'active') {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          this.userInput.push(event.key);
          this.currentComboKeys.push(this.currentCombo.keys[this.index])
          this.index++;

          // Compara i due array per verificare corretto inserimento
          if (this.userInput.every((value, index) => value === this.currentComboKeys[index])) {
            //successo > combo prosegue o completata
            if (this.currentComboKeys.length === this.currentCombo.keys.length) {
              this.completeCombo();
            } else {
              console.log("tasto combo corretto... continua!")
            }
            //fallimento combo! fai refactor in nuova funzione!!
          } else {
            console.log("tasto incorretto... rinizia!");
            this.userInput = [];
            this.currentComboKeys = [];
            this.index = 0;
            console.log("Reset keys utente");
          }
        }
      }
    },
    completeCombo() {
      console.log(this.currentCombo.damage, "danni inflitti!")

      const damage = this.currentCombo.damage;
      this.$emit('completedCombo', damage);
      this.chooseRandomCombo();
    }
  },
  mounted() {
    this.chooseRandomCombo();
    window.addEventListener('keydown', this.handleKeyDown);
  }
}

</script>

<template>
  <div v-if="currentCombo">
    <h3>Current combo: {{ currentCombo.name }}</h3>
    <ul>
      <li v-for="(key, index) in currentCombo.keys" :key="index">
        | {{ key }} |
      </li>
    </ul>
    <h4>Damage: {{ currentCombo.damage }}</h4>
  </div>
</template>

<style>
ul {
  list-style: none;

  li {
    margin: 1rem;
    display: inline;
    font-size: 1.5rem;
  }
}
</style>
