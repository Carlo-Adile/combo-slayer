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
          return '../assets/UI/arrowTop.png';
        case 'ArrowDown':
          return '../assets/UI/arrowBottom.png';
        case 'ArrowLeft':
          return '../assets/UI/arrowLeft.png';
        case 'ArrowRight':
          return '../assets/UI/arrowRight.png';
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

            this.$refs.wrongButton.volume = 0.5;
            this.$refs.wrongButtonNoob.volume = 0.5;
            this.$refs.wrongButton.play();
            if (this.$refs.wrongButton.paused) { // Controlla se il suono è in pausa
              this.$refs.wrongButtonNoob.play(); // Avvia il suono solo se è in pausa
            }
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

  <!-- root di my_name e my_info -->
  <div v-if="currentCombo" id="my_combos">
    <!-- combo name -->
    <div id="my_name">
      <p>{{ currentCombo.name }}</p>
    </div>

    <div id="my_info">

      <!-- buttons to press -->
      <div id="my_buttons">
        <ul>
          <li v-for="(key, index) in currentCombo.keys" :key="index">
            <img :src="getImageSource(key)" alt="" class="img_fit" :class="{ 'pressed': index < userInput.length }" />
          </li>
        </ul>
      </div>

      <!-- damage of current combo -->
      <div id="my_damage">
        <p>{{ this.currentCombo.damage }}</p>
        <img src="../assets/icons/sword.png" alt="">
      </div>
    </div>
  </div>

  <!-- fx -->
  <audio ref="retro1" src="../assets/sound/Retro1.mp3"></audio>
  <audio ref="retro2" src="../assets/sound/Retro2.mp3"></audio>
  <audio ref="minimalist1" src="../assets/sound/Minimalist1.mp3"></audio>
  <!-- wrong button -->
  <audio ref="wrongButton" src="../assets/sound/fail2.wav"></audio>
  <audio ref="wrongButtonNoob" src="../assets/sound/fail2.wav"></audio>

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

  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 0.5rem;

  /* border: 2px dashed black; */
}

#my_name {
  height: 40%;
  width: 80%;
  text-align: center;
  font-size: 1.4rem;

  /* border: 2px dashed black; */
}

#my_info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60%;

  /* border: 2px dashed black; */
}

#my_buttons {
  height: 80%;
  width: 80%;

  /* border: 2px dashed black; */

  ul {
    margin: 0 auto;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      flex-wrap: nowrap;
      display: inline;

      padding-left: 0.1rem;
      padding-right: 0.1rem;

      img {
        width: 13%;
        height: auto;
        object-fit: cover;
      }
    }
  }
}

/* danni della combo attuale */
#my_damage {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:center ;

  /* border: 2px dashed black; */

  p {
    font-size: 1.7rem;
    padding: 0;
    margin: 0;
  }
  img{
    width: 20px;
    height: 20px;
  }
}
</style>
