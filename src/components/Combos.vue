<!-- set active combo -->
<script>
import { combos } from '../combos.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Combos",
  emits: ['completedCombo'],
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
    getImageSource(key) {
      //sostituisci i bottoni con i percorsi delle immagini
      switch (key) {
        case 'ArrowUp':
          return './src/assets/UI/arrowTop.png';
        case 'ArrowDown':
          return './src/assets/UI/arrowBottom.png';
        case 'ArrowLeft':
          return './src/assets/UI/arrowLeft.png';
        case 'ArrowRight':
          return './src/assets/UI/arrowRight.png';
        default:
          return ''; // Ritorna un percorso vuoto per eventuali tasti non previsti
      }
    },
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
            /* this.$refs.retro1.volume = 0.3; */
            this.$refs.minimalist1.play();
            if (this.$refs.minimalist1.paused) { // Controlla se il suono è in pausa
              this.$refs.minimalist1.play(); // Avvia il suono solo se è in pausa
            }
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
  <div v-if="currentCombo" id="my_combos">
    <!-- combo name -->
    <div id="my_name">
      <p>{{ currentCombo.name }}</p>
    </div>
    <!-- buttons to press -->
    <div id="my_buttons">
      <ul>
        <li v-for="(key, index) in currentCombo.keys" :key="index">
          <img :src="getImageSource(key)" alt="" class="img_fit" :class="{ 'pressed': index < userInput.length }" />
        </li>
      </ul>
    </div>
    <!-- damage frame -->
    <div id="my_damage">
      <p>{{ this.currentCombo.damage }}</p>
    </div>
  </div>

  <!-- fx -->
  <audio ref="fastBip" src="./src/assets/sound/fast_bip.mp3"></audio>
  <audio ref="retro1" src="./src/assets/sound/Retro1.mp3"></audio>
  <audio ref="retro2" src="./src/assets/sound/Retro2.mp3"></audio>
  <audio ref="minimalist1" src="./src/assets/sound/Minimalist1.mp3"></audio>

</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

* {
  color: black;
  font-family: alagard;
}

.pressed {
  filter: brightness(0.7);
}

#my_combos {
  height: 100%;
  width: 100%;
}

#my_name {
  height: 20%;
  width: 80%;
  text-align: center;
  margin-left: 0.5rem;
  font-size: 1.4rem;
}

#my_buttons {
  height: 26%;
  width: 80%;
  display: flex;

  ul {
    margin: 0 auto;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      flex-wrap: nowrap;
      display: inline;

      img {
        height: 30px;
        width: 30px;
        /* height: 80%;
        width: 25%; */
        object-fit: cover;
        margin: 0.25rem;
      }
    }
  }
}

/* danni della combo attuale */
#my_damage {
  position: absolute;
  top: 20%;
  right: 0%;

  width: 20%;
  height: 26%;

  p {
    font-size: 1.8rem;
    margin: 0;
  }
}
</style>
