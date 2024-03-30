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
          <!-- <ul>
            <li>Livello raggiunto: </li>
            <li>Round raggiunto: </li>
            <li>Nemici sconfitti: </li>
            <li>Combo completate: </li>
          </ul> -->
        </div>
        <button @click="restartGame">Restart</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
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