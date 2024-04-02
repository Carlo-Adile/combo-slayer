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
    getImageSource(key) {
      // Sostituisci con i percorsi corretti delle immagini per le frecce direzionali
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
  <div v-if="currentCombo" id="combo_box" class="container">
    <!-- <h3>Current combo: {{ currentCombo.name }}</h3> -->
    <div id="combo_frame" class="row align-content-start">
      <div id="name_frame" class="col-12">
        <div>
          <p>{{ currentCombo.name }}</p>
        </div>
      </div>
      <div  class="col-12">
        <div id="buttons_frame">
          <ul>
            <li v-for="(key, index) in currentCombo.keys" :key="index">
              <img :src="getImageSource(key)" alt="" class="img_fit" />
            </li>
          </ul>
        </div>

      </div>
    </div>





    <!-- <h4>Damage: {{ currentCombo.damage }}</h4> -->
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

* {
  color: black;
  font-family: alagard;
}

#combo_box {
  @include align_all;

  width: 100%;

  /* border: 1px dashed lightgray; */
}

#combo_frame {
  @include align_all;
  width: 400px;
  height: 125px;
  padding-top: 0.5rem;
  /* background-image: url('../assets/UI/Banner_Connected_Large.png');
  background-repeat: no-repeat;
  background-size: contain; */

  /* border: 1px dashed white; */
}

#name_frame {
  @include align_all;
  
  height: 30px;
  font-size: 1.5rem;
  margin-bottom: 0.4rem;

  /* border: 1px dashed white; */
}

#buttons_frame {
  @include align_all;
  /* width: 275px;
  height: 75px; */

  /* border: 1px dashed white; */
}

.img_fit {
  width: 40px;
  height: 40px;
}

ul {
  margin: 0 auto;
  padding: 0;
  list-style: none;


  li {
    display: flex;
    flex-wrap: nowrap;
    display: inline;

    img {
      margin: 0.25rem;
    }
  }
}
</style>
