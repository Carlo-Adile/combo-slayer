import { reactive } from 'vue';

export const enemies = reactive ([
  {
    "id": 1,
    "name": "Goblin Torch",
    "maxHealth": 30,
    "health": 30,
    "image": "../assets/enemies/Torch_Blue.png",
    "animationPositions": [
      { name: "animation1", x: 0, y: 0 },
      { name: "animation2", x: -192, y: 0 },
      { name: "animation3", x: -384, y: 0 },
      { name: "animation4", x: -576, y: 0},
      { name: "animation5", x: -768, y: 0},
      { name: "animation6", x: -960, y: 0}
    ]
  },
  {
    "id": 2,
    "name": "Goblin Bomber",
    "maxHealth": 30,
    "health": 30,
    "image": "../assets/enemies/TNT_Blue.png",
    "animationPositions": [
      { name: "animation1", x: 0, y: 0 },
      { name: "animation2", x: -192, y: 0 },
      { name: "animation3", x: -384, y: 0 },
      { name: "animation4", x: -576, y: 0},
      { name: "animation5", x: -768, y: 0},
      { name: "animation6", x: -960, y: 0}
    ]
  },
  {
    "id": 3,
    "name": "Sword Knight",
    "maxHealth": 30,
    "health": 30,
    "image": "../assets/enemies/Warrior_Purple.png",
    "animationPositions": [
      { name: "animation1", x: 0, y: 0 },
      { name: "animation2", x: -192, y: 0 },
      { name: "animation3", x: -384, y: 0 },
      { name: "animation4", x: -576, y: 0},
      { name: "animation5", x: -768, y: 0},
      { name: "animation6", x: -960, y: 0}
    ]
  },
  {
    "id": 4,
    "name": "Pawn Knight",
    "maxHealth": 30,
    "health": 30,
    "image": "../assets/enemies/Pawn_Yellow.png",
    "animationPositions": [
      { name: "animation1", x: 0, y: 0 },
      { name: "animation2", x: -192, y: 0 },
      { name: "animation3", x: -384, y: 0 },
      { name: "animation4", x: -576, y: 0},
      { name: "animation5", x: -768, y: 0},
      { name: "animation6", x: -960, y: 0}
    ]
  },
  {
    "id": 5,
    "name": "Pawn Knight",
    "maxHealth": 30,
    "health": 30,
    "image": "../assets/enemies/Archer_Red.png",
    "animationPositions": [
      { name: "animation1", x: 0, y: 0 },
      { name: "animation2", x: -192, y: 0 },
      { name: "animation3", x: -384, y: 0 },
      { name: "animation4", x: -576, y: 0},
      { name: "animation5", x: -768, y: 0},
      { name: "animation6", x: -960, y: 0}
    ]
  },
]);

