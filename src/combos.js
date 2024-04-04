import { reactive } from 'vue';

export const combos = reactive([
  {
    "id": 1,
    "name": "Sword Slash",
    "damage": 20,
    "keys": ["ArrowUp", "ArrowDown", "ArrowUp", "ArrowRight", "ArrowUp"]
  },
  {
    "id": 2,
    "name": "Dagger Hit",
    "damage": 10,
    "keys": ["ArrowUp", "ArrowRight", "ArrowRight"]
  },
  {
    "id": 3,
    "name": "Hammer Strike",
    "damage": 20,
    "keys": ["ArrowUp", "ArrowDown", "ArrowDown", "ArrowDown", "ArrowLeft"]
  },
  {
    "id": 4,
    "name": "Spear Charge",
    "damage": 15,
    "keys": ["ArrowUp", "ArrowRight", "ArrowRight", "ArrowDown"]
  },
  {
    "id": 5,
    "name": "Bow Shot",
    "damage": 15,
    "keys": ["ArrowUp", "ArrowLeft", "ArrowLeft", "ArrowDown"]
  },
  {
    "id": 6,
    "name": "Shield Bash",
    "damage": 10,
    "keys": ["ArrowUp", "ArrowDown", "ArrowDown"]
  },
  {
    "id": 7,
    "name": "GreatAxe Slam",
    "damage": 30,
    "keys": ["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowDown"]
  }
]); 