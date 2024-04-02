<template>
  <div id="enemy_frame" v-if="currentEnemy">
    <div id="name_frame">
      <p>{{ currentEnemy.name }}</p>
    </div>
    <div id="health_frame">
      <p>{{ currentEnemy.health }}/{{ currentEnemy.maxHealth }} Health</p>
    </div>
    <div
      id="enemy_here"
      class="enemy_animation"
      :style="enemyAnimationStyle"
    ></div>
  </div>
</template>

<script>
import { enemies } from '../enemies.js';
import { mapGetters } from 'vuex';

export default {
  name: "Enemies",
  emits: ['chooseRandomEnemy', 'defeatedEnemy'],
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
      if(newValue === 'active'){
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
      this.$emit('chooseRandomEnemy', this.currentEnemy);
      /* animazione */
      /* this.currentAnimationIndex = 0;
      clearInterval(this.animationInterval);
      this.startAnimation(); */
    },
    applyDamage(damage) {
      this.currentEnemy.health -= damage;
      if (this.currentEnemy.health <= 0) {
        this.defeatEnemy();
      }
    },
    defeatEnemy() {
      this.$emit('defeatedEnemy');
      this.currentEnemy.health = this.currentEnemy.maxHealth;
      this.chooseRandomEnemy();
    },
    startAnimation() {
      this.animationInterval = setInterval(() => {
        if (this.currentEnemy) {
          this.currentAnimationIndex++;
          console.log("animazione completata");
          if (this.currentAnimationIndex >= this.totalAnimation) {
            this.currentAnimationIndex = 0;
            console.log("animazione resettata");
          }
        }
      }, 100);
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

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

* {
  color: black;
  font-family: alagard;
}

#enemy_frame {
  width: 400px;
  height: 125px;
  margin: 0 auto;

  p {
    margin: 0;
  }
}

#name_frame {
  font-size: 1.8rem;

}

#health_frame {
  font-size: 1.4rem;
}

#enemy_here {
  position: absolute;
  z-index: 1000;
  top: -100%;
  left: 32%;

  border-radius: 50%;
  box-shadow: 0 0 20px rgba(243, 6, 6, 0.703);
}

.enemy_animation {
  width: 192px;
  height: 192px;
  background-size: auto;
}
</style>
