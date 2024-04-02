<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "GameOverScreen",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['getScore']),
    ...mapGetters(['getGameState'])
  },
  methods: {
    ...mapActions(['updateGameState']),
    restartGame() {
      
      this.updateGameState('preGame');
    }
  }
}
</script>

<template>
  <div>
    <div class="modal-overlay" v-show="getGameState === 'gameOver'">
      <div class="modal-content">
        <h2>Game Over!</h2>
        <div>
          <h4>Punti totalizzati: {{  getScore }}</h4>
          
        </div>
        <button @click="restartGame">Restart</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

*{
  font-family: alagard;
  color: black;
}

.modal-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>