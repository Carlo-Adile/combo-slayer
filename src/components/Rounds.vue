<script>
import { ref } from 'vue';
import Enemies from './Enemies.vue';
import Combos from './Combos.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Rounds",
  emits: ['completedRound', 'defeatedEnemy', 'completedCombo', 'completeLevel'],
  data() {
    return {
      currentEnemy: null,
      currentRound: 1,
      currentLevel: 1
    }
  },
  components: {
    Enemies,
    Combos
  },
  computed: {
    ...mapGetters(['getGameState']),
    ...mapGetters(['getScore'])
  },
  watch: {
    getGameState(newState) {
      if (newState === 'gameOver') {
        this.currentRound = 1;
        this.currentLevel = 1
      }
    }
  },
  methods: {
    handleCompletedCombo(damage) {
      //passa il danno da Combos a Enemies
      this.$refs.enemies.applyDamage(damage);
      this.completedCombo++;

      this.$emit('completedCombo');
    },
    handleDefeatedEnemy() {
      this.$emit('defeatedEnemy')
      this.currentRound++;
      if (this.currentRound > 5) {
        this.completeLevel();
      }

      this.$emit('completedRound');
    },
    completeLevel() {
      console.log("hai completato un livello intero!")
      this.currentRound = 1;
      this.currentLevel++;
      this.$emit('completeLevel');
    }
  }
}

</script>

<template>
  <div id="complete_UI" class="debug mx-auto">
      <div id="level_frame" class="debug">
      </div>
      <div id="enemy_frame">
        <Enemies ref="enemies" @defeatedEnemy="handleDefeatedEnemy" />
      </div>
      <div id="combo_frame" class="debug">
        <Combos ref="damage" @completedCombo="handleCompletedCombo" />
      </div>
    </div>

    <div id="round_ribbon">
      <p>Level {{ this.currentLevel }} | Round {{ this.currentRound }}</p>
    </div>


</template>

<style lang="scss" scoped>
@import '../assets/scss/font';
@import '../assets/scss/structure';

*{
  font-family: alagard;
  color: black;
}

#round_ribbon{
  width: 280px;
  height: 150px;

  position: absolute;
  right: 13%;
  bottom: 24%;

  background-image: url('../assets/UI/Ribbon_Red_Large.png');
  background-repeat: no-repeat;
  background-size: contain;

  p{
    /* text-align: start;
    padding: 0.5rem 0 0 3rem; */

    padding-top: 0.5rem;
    font-size: 1.4rem;
    
  }

}

.debug2 {
  border: 1px dashed white;
}

#complete_container{
  margin: 0 auto;
  width: 600px;
  height: 600px;
}
#complete_UI {
  width: 575px;
  height: 650px;
  position: relative;
  z-index: 1;

  background-image: url('../src/assets/UI/complete_UI.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 96%;
}

#level_frame {
  @include align_all;
  /* original size: 480x400; current: 70% */
  /* width: 336px;
  height: 280px; */

  /* original size: 480x400; current: 75% */
  width: 360px;
  height: 300px;

  position: absolute;
  top: 3%;
  left: 18%;

  background-image: url('../src/assets/levels/level_1.png');
  background-repeat: no-repeat;
  background-size: contain;
}

#enemy_frame {
  width: 100%;
  height: 300px;

  position: absolute;
  top: 38%;
  left: 0%;
}

#combo_frame {
  width: 100%;
  height: 200px;

  position: absolute;
  top: 74%;
  left: 0%;
}

</style>
