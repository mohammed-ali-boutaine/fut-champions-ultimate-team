import { redAlert } from "./functions/alert.js";
import {
  addEquipePlayer,
  getEquipePlayers,
  setEquipe,
  showEquipePlayers,
} from "./functions/equipeFunction.js";
import {
  addPlayer,
  displayPlayers,
  getPlayers,
  setPlayers,
} from "./functions/playerFunctions.js";
import Player from "./modules/Player";

const url = "http://localhost:3000/players";
const palyersDataPath = "/api/data.json";

// Get palyers data
async function showData() {
  try {
    let players: Player[] = getPlayers();

    if (players.length === 0) {
      const response = await fetch(palyersDataPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlayers(data.players);
      players = data.players;
    }

    displayPlayers(players);
  } catch (error) {
    console.error("Failed to load players:", error);
    redAlert(
      `Failed to load players: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// add player form 
const formContainer = document.getElementById("add-player-form");
if (!formContainer) {
  throw new Error("Form container not found");
}

const form = formContainer.querySelector("form");
if (!form) {
  throw new Error("Form element not found");
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  addPlayer();
  displayPlayers(getPlayers());
});

// Improve card interaction handling
const playerDivs = document.querySelectorAll<HTMLDivElement>(".field .player");

playerDivs.forEach((playerDiv, index) => {
  playerDiv.addEventListener("click", function () {
    const cardsContainer = document.querySelector<HTMLDivElement>(".cards");
    if (!cardsContainer) return;

    const cards = document.querySelectorAll<HTMLDivElement>(".cards .card");
    cardsContainer.classList.add("shaking");

    const cleanup = () => {
      cardsContainer.classList.remove("shaking");
      cards.forEach((card) =>
        card.removeEventListener("click", handleCardClick)
      );
    };

    const handleCardClick = (cardEvent: MouseEvent) => {
      const card = cardEvent.currentTarget as HTMLDivElement;
      const playerId = Number(card.id);
      const player = getPlayers().find((p) => p.id === playerId);

      if (player) {
        addEquipePlayer(index, player);
      }

      cleanup();
    };

    cards.forEach((card) => card.addEventListener("click", handleCardClick));
  });
});

// init app
showData();
showEquipePlayers();
setEquipe(getEquipePlayers());
