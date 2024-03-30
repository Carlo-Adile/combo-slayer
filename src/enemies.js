import { reactive } from 'vue';

export const enemies = reactive ([
  {
    "id": 1,
    "name": "Goblin",
    "maxHealth": 30,
    "health": 30
  },
  {
    "id": 2,
    "name": "Skeleton",
    "maxHealth": 25,
    "health": 25
  },
  {
    "id": 3,
    "name": "Bat",
    "maxHealth": 20,
    "health": 20
  }
]);

