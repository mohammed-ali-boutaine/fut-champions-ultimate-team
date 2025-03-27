var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { redAlert } from "./functions/alert.js";
import { addEquipePlayer, getEquipePlayers, setEquipe, showEquipePlayers, } from "./functions/equipeFunction.js";
import { addPlayer, displayPlayers, getPlayers, setPlayers, } from "./functions/playerFunctions.js";
const url = "http://localhost:3000/players";
const palyersDataPath = "./api/data.json";
// Get palyers data
function showData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let players = getPlayers();
            if (players.length === 0) {
                const response = yield fetch(palyersDataPath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = yield response.json();
                setPlayers(data.players);
                players = data.players;
            }
            displayPlayers(players);
        }
        catch (error) {
            console.error("Failed to load players:", error);
            redAlert(`Failed to load players: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    });
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
const playerDivs = document.querySelectorAll(".field .player");
playerDivs.forEach((playerDiv, index) => {
    playerDiv.addEventListener("click", function () {
        const cardsContainer = document.querySelector(".cards");
        if (!cardsContainer)
            return;
        const cards = document.querySelectorAll(".cards .card");
        cardsContainer.classList.add("shaking");
        const cleanup = () => {
            cardsContainer.classList.remove("shaking");
            cards.forEach((card) => card.removeEventListener("click", handleCardClick));
        };
        const handleCardClick = (cardEvent) => {
            const card = cardEvent.currentTarget;
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
