import { redAlert } from "./functions/alert.js";
import { addPlayer, displayPlayers, getPlayers, setPlayers } from "./functions/playerFunctions.js";
const url = "http://localhost:3000/players";
// Fetch and display player data
async function showData() {
    let players = getPlayers();
    if (players.length === 0) {
        try {
            const res = await fetch(url);
            players = await res.json();
            setPlayers(players);
        }
        catch (error) {
            redAlert("Error fetching players: " + error);
            return;
        }
    }
    displayPlayers(players);
}
// Handle form submission for adding a new player
const formContainer = document.getElementById("add-player-form");
document.querySelector("#add-player-form form")?.addEventListener("submit", function (ev) {
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
        cardsContainer?.classList.add("shaking");
        console.log("Player clicked:", ev);
        const handleCardClick = (cardEvent) => {
            const card = cardEvent.currentTarget;
            // playerDiv.innerHTML = card.innerHTML;
            playerDiv.append = card.innerHTML;
            console.log("Card clicked:", cardEvent);
            cardsContainer?.classList.remove("shaking");
            cards.forEach(card => card.removeEventListener("click", handleCardClick));
        };
        cards.forEach(card => {
            card.addEventListener("click", handleCardClick);
        });
    });
});
// Initialize the application by showing data
showData();
