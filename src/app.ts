import { redAlert, greenAlert } from "./functions/alert.js";
import { addEquipePlayer, getEquipePlayers, setEquipe, showEquipePlayers } from "./functions/equipeFunction.js";
import { addPlayer, displayPlayers, getPlayers, setPlayers } from "./functions/playerFunctions.js";
import Player from "./modules/Player";

const url = "http://localhost:3000/players";

// Fetch and display player data
async function showData() {
    let players: Player[] = getPlayers();
    if (players.length === 0) {
        try {
            const res = await fetch(url);
            players = await res.json();
            setPlayers(players);
        } catch (error) {
            redAlert("Error fetching players: " + error);
            return;
        }
    }
    displayPlayers(players);
}

// Handle form submission for adding a new player
const formContainer = document.getElementById("add-player-form") as HTMLDivElement;
document.querySelector("#add-player-form form")?.addEventListener("submit", function (ev) {
    ev.preventDefault();
    addPlayer();
    formContainer.classList.toggle("hidden");
    displayPlayers(getPlayers());
});

// Handle player card interactions
const playerDivs = document.querySelectorAll(".field .player") as NodeListOf<HTMLDivElement>;

playerDivs.forEach((playerDiv,index) => {
    playerDiv.addEventListener("click", function (ev: MouseEvent) {

        const cardsContainer = document.querySelector(".cards") as HTMLDivElement;
        const cards = document.querySelectorAll(".cards .card") as NodeListOf<HTMLDivElement>;

        cardsContainer?.classList.add("shaking");

        const handleCardClick = (cardEvent: MouseEvent) => {
            const card = cardEvent.currentTarget as HTMLDivElement;

            let player:Player | undefined= getPlayers().find(player => player.id == Number(card.id))
            addEquipePlayer(index,player)

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
showEquipePlayers()
setEquipe(getEquipePlayers())