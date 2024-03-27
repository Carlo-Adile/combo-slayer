<!-- set active combo -->
<script>
import { combos } from '../combos.js';

export default {
  name: "Combos",
  props: {
    activeCombo: Object
  },
  data() {
    return {
      currentCombo: {},
      currentComboKeys: [],
      userInput: [],
      index: 0
    }
  },
  methods: {
    /* assegna nuova combo, resetta il resettabile */
    chooseRandomCombo() {
      const randomIndex = Math.floor(Math.random() * combos.length);
      this.currentCombo = combos[randomIndex];
      this.$emit('chooseRandomCombo', this.currentCombo);
      this.userInput = [];
      this.currentComboKeys = [];
      this.index = 0;
      console.log("la nuova combo è...", this.currentCombo.name);

      //test
      /* console.log("Keys della combo attuale: ", this.currentCombo.keys) */
    },

    //aggiungi input del player in un array e aggiungi input corretti della combo attuale in un array
    handleKeyDown(event) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        this.userInput.push(event.key);
        this.currentComboKeys.push(this.currentCombo.keys[this.index])
        this.index++;

        //test
        /* console.log("key premuta: ", this.userInput)
        console.log("Keys inserite dal player: ", this.userInput);
        console.log("Keys che stiamo confrontando: ", this.currentComboKeys); */

        // Compara i due array per verificare corretto inserimento
        if (this.userInput.every((value, index) => value === this.currentComboKeys[index])) {
          //successo > combo prosegue o completata
          if (this.currentComboKeys.length === this.currentCombo.keys.length) {
            console.log("successo... hai completato la combo! preparazione nuova combo in corso...");
            this.chooseRandomCombo();
          } else {
            console.log("successo... continua!")
          }
          //fallimento !fai refactor in nuova funzione!!
        } else {
          console.log("fallimento... rinizia!");
          this.userInput = [];
          this.currentComboKeys = [];
          this.index = 0;
          console.log("Reset keys utente");
        }
      }
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
