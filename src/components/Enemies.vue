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
  <div id="my_enemy" v-if="currentEnemy">

    <!-- info enemy -->
    <div id="name_frame">
      <p>{{ currentEnemy.name }}</p>
    </div>

    <!-- progress health -->
    <div class="progress mx-auto" style="height: 14px;" id="my_enemy_progress">
      <img src="../assets/UI/healthbar.png" alt="">
      <div class="progress-bar bg-danger" role="progressbar"
        :style="{ width: (currentEnemy.health / currentEnemy.maxHealth * 100) + '%' }"
        :aria-valuenow="currentEnemy.health" :aria-valuemin="0" :aria-valuemax="currentEnemy.maxHealth">
        <span class="sr-only">{{ currentEnemy.health }} / {{ currentEnemy.maxHealth }}</span>
        {{ currentEnemy.health }} / {{ currentEnemy.maxHealth }} Health
      </div>
    </div>

    <!-- idle enemy -->
    <div id="enemy_idle" class="enemy_animation" :style="enemyAnimationStyle"></div>

  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

* {
  color: black;
  font-family: alagard;
}

#my_enemy {
  height: 100px;
  width: auto;

  p {
    margin: 0;
  }
  
}

#enemy_idle {
  margin-top: -3rem;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(243, 6, 6, 0.703);
}

.enemy_animation {
  width: 192px;
  height: 192px;
}

#my_enemy_progress {
  position: relative;
  width:150px;
  overflow: visible;
  font-size: 0.8rem;
  border: 1px solid black;

  img{
    position: absolute;
    top: -86%;
    left: -34%;
    z-index: -1;

    width:170%;
    height: 260%;
  }
}

#name_frame {
  font-size: 1.6rem;
}

#health_frame {
  font-size: 1.4rem;
}
</style>
