var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { redAlert } from "./functions/alert.js";
import { addPlayer, displayPlayers, getPlayers, setPlayers } from "./functions/playerFunctions.js";
const url = "http://localhost:3000/players";
// Fetch and display player data
function showData() {
    return __awaiter(this, void 0, void 0, function* () {
        let players = getPlayers();
        if (players.length === 0) {
            try {
                const res = yield fetch(url);
                players = yield res.json();
                setPlayers(players);
            }
            catch (error) {
                redAlert("Error fetching players: " + error);
                return;
            }
        }
        displayPlayers(players);
    });
}
// Handle form submission for adding a new player
const formContainer = document.getElementById("add-player-form");
(_a = document.querySelector("#add-player-form form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (ev) {
    ev.preventDefault();
    addPlayer();
    formContainer.classList.toggle("hidden");
    displayPlayers(getPlayers());
});
// Handle player card interactions
const playerDivs = document.querySelectorAll(".player");
playerDivs.forEach(playerDiv => {
    playerDiv.addEventListener("click", function (ev) {
        const cardsContainer = document.querySelector(".cards");
        const cards = document.querySelectorAll(".cards .card");
        cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.classList.add("shaking");
        console.log("Player clicked:", ev);
        const handleCardClick = (cardEvent) => {
            const card = cardEvent.currentTarget;
            // Assuming playerDiv already has some child to be replaced
            const firstChild = playerDiv.firstElementChild;
            if (firstChild) {
                // Replace the first child of playerDiv with the card
                playerDiv.replaceChild(card, firstChild);
            }
            else {
                // If there's no child, append the card
                playerDiv.appendChild(card);
            }
            console.log("Card clicked:", cardEvent);
            cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.classList.remove("shaking");
            cards.forEach(card => card.removeEventListener("click", handleCardClick));
        };
        cards.forEach(card => {
            card.addEventListener("click", handleCardClick);
        });
    });
});
// Initialize the application by showing data
showData();
