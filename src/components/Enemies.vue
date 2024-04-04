<script>
import { enemies } from '../enemies.js';
import { mapGetters } from 'vuex';

export default {
  name: "Enemies",
  emits: ['defeatedEnemy'],
  data() {
    return {
      currentEnemy: null,
      currentAnimationIndex: 0,
      totalAnimation: 6,
      originalEnemies: [],
    }
  },
  computed: {
    ...mapGetters(['getGameState']),

    enemyAnimationStyle() {
      if (this.currentEnemy && this.currentEnemy.animationPositions) {
        const animationIndex = this.currentAnimationIndex % this.totalAnimation;
        const animationPosition = this.currentEnemy.animationPositions[animationIndex];
        return {
          backgroundImage: `url(${this.currentEnemy.image})`,
          backgroundPosition: `${animationPosition.x}px ${animationPosition.y}px`,
        };
      } else {
        return null;
      }
    },
  },
  watch: {
    getGameState(newValue) {
      if (newValue === 'active') {
        this.startAnimation();
      }
      if (newValue === 'gameOver' || newValue === 'preGame') {
        this.cancelAnimation();
      }
    }
  },
  methods: {
    chooseRandomEnemy() {
      console.log("Generazione nemico in corso...");
      const randomIndex = Math.floor(Math.random() * this.originalEnemies.length);
      this.currentEnemy = this.originalEnemies[randomIndex];
    },
    applyDamage(damage) {
      this.currentEnemy.health -= damage;
      if (this.currentEnemy.health <= 0) {
        this.defeatEnemy();
      }
    },
    defeatEnemy() {
      this.$emit('defeatedEnemy');

      this.chooseRandomEnemy();
      this.currentEnemy.health = this.currentEnemy.maxHealth;
    },
    startAnimation() {
      this.animationInterval = setInterval(() => {
        if (this.currentEnemy) {
          this.currentAnimationIndex++;

          if (this.currentAnimationIndex >= this.totalAnimation) {
            this.currentAnimationIndex = 0;
          }
        }
      }, 200);
    },
    cancelAnimation() {
      clearInterval(this.animationInterval);
    }
  },
  mounted() {
    this.originalEnemies = enemies.map(enemy => ({ ...enemy }));
    this.chooseRandomEnemy();
  },
  beforeUnmount() {
    clearInterval(this.animationInterval);
  }
}
</script>

<template>

  <!-- root di name, progress health e my_enemy_idle -->
  <div id="my_enemy" v-if="currentEnemy">

    <!-- info enemy -->
    <div id="my_name">
      <p>{{ currentEnemy.name }}</p>
    </div>

    <!-- progress health -->
    <div id="my_progress">
      <div class="progress mx-auto" id="my_healthbar">
        <img src="../assets/UI/healthbar.png" alt="">
        <div class="progress-bar bg-danger" role="progressbar"
          :style="{ width: (currentEnemy.health / currentEnemy.maxHealth * 100) + '%' }"
          :aria-valuenow="currentEnemy.health" :aria-valuemin="0" :aria-valuemax="currentEnemy.maxHealth">
          <span class="sr-only">{{ currentEnemy.health }} / {{ currentEnemy.maxHealth }}</span>
          {{ currentEnemy.health }} / {{ currentEnemy.maxHealth }} Health
        </div>
      </div>
    </div>


    <!-- idle enemy -->
    <div id="my_enemy_idle">

      <div class="enemy_animation" :style="enemyAnimationStyle">
          <!-- ENEMY HERE -->
        </div>

      <!-- <div id="enemy_resize">
        
      </div> -->
    </div>


  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

* {
  color: black;
  font-family: alagard;
}

/* root principale */
#my_enemy {
  display: flex;
  flex-direction: column;

  height: 100%;
  width: auto;

  p {
    margin: 0;
  }
}

#my_name {
  width: 100%;
  height: 20%;

  p {
    font-size: 1.4rem;
  }

  /* border: 1px dashed black; */
}

#my_progress {
  position: relative;
  width: 100%;
  height: 20%;
  margin-top: 0.3rem;
  font-size: 0.8rem;

  /* border: 1px dashed black; */

  img {
    position: absolute;
    top: -45%;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 130%;
  }
}

#my_healthbar {
  height: 10px;
  width: 110px;
}

/* enemy idle */
#my_enemy_idle {
  width: 100%;
  height: 60%;

  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 2px dashed black; */
}

/* #enemy_resize{
  width: 100%;
  height: 80%;

  display: flex;
  justify-content: center;
  align-items: center;

} */

.enemy_animation {
  width: 192px;
  height: 192px;

  border-radius: 50%;
  box-shadow: 0 0 20px rgba(243, 6, 6, 0.703);

  min-width: 192px; /* Assicurati che la larghezza non superi mai il 100% del genitore */
  min-height: 192px;
}
</style>
