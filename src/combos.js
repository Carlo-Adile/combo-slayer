import { reactive } from 'vue';

export const combos = reactive([
  {
    "id": 1,
    "name": "colpo di spada",
    "damage": 20,
    "keys": ["ArrowUp", "ArrowDown", "ArrowUp", "ArrowRight", "ArrowUp"]
  },
  {
    "id": 2,
    "name": "pugnalata",
    "damage": 10,
    "keys": ["ArrowUp", "ArrowRight", "ArrowRight"]
  },
  {
    "id": 3,
    "name": "colpo di martello",
    "damage": 20,
    "keys": ["ArrowUp", "ArrowDown", "ArrowDown", "ArrowDown", "ArrowLeft"]
  }
]); 