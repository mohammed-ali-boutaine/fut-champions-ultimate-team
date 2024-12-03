import Player from "../modules/Player.js";
import { greenAlert, redAlert } from "./alert.js";
//-----------------------------------
//       get Player function
function getPlayers() {
    let players = [];
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
    }
    // console.log(players);
    return players;
}
//-----------------------------------
//      set Player function
function setPlayers(players) {
    localStorage.setItem("players", JSON.stringify(players));
}
//-----------------------------------
//      add Player function
function addPlayer() {
    try {
        // Get data from form
        const name = document.getElementById("name");
        const position = document.getElementById("position");
        const nationality = document.getElementById("nationality");
        const club = document.getElementById("club");
        const ratingInput = document.getElementById("rating");
        // Form validation
        // Validate form inputs
        if (!(name === null || name === void 0 ? void 0 : name.value.trim()) ||
            !(position === null || position === void 0 ? void 0 : position.value.trim()) ||
            !(nationality === null || nationality === void 0 ? void 0 : nationality.value.trim()) ||
            !(club === null || club === void 0 ? void 0 : club.value.trim()) ||
            !(ratingInput === null || ratingInput === void 0 ? void 0 : ratingInput.value.trim())) {
            redAlert("All fields are required.");
            return;
        }
        // Create player object
        const rating = parseInt(ratingInput.value, 10) || 0;
        let players = getPlayers();
        let id = players.length > 0 ? players[players.length - 1].id + 1 : 1;
        const player = new Player(id, name.value, position.value, nationality.value, club.value, rating);
        console.log(player);
        console.log(players);
        // Add player to list
        players.push(player);
        setPlayers(players);
        greenAlert("Player added successfully");
    }
    catch (error) {
        console.error("Error adding player:", error);
        redAlert("An unexpected error occurred. Please try again.");
    }
}
//-----------------------------------
// Update an existing player
function updatePlayer(updatedPlayer) {
    let players = getPlayers();
    const index = players.findIndex((player) => player.id === updatedPlayer.id);
    if (index !== -1) {
        players[index] = updatedPlayer;
        setPlayers(players);
        greenAlert("Player updated successfully");
    }
    else {
        redAlert("Player not found");
    }
}
//-----------------------------------
// Generate HTML for a player card
function card(player) {
    let { id, photo, flag, nationality, rating, position, name, club } = player;
    const defaultPhoto = "./assets/images/unknown-player.png";
    const defaultFlag = "./assets/images/unknown-flag.png";
    let playerPhoto = photo ? photo : defaultPhoto;
    let playerFlag = flag ? flag : defaultFlag;
    // console.log(player.rating);
    if (!rating) {
        rating = player._rating;
    }
    return `
    <div title="${player.name}" class="card" id="${id}">
    <a title="edit player" class="edit" href="./edit/?id=${id}">
    <img src="./assets/images/edit.svg"/>
    </a>
    <button  title="delete player" class="delete">
        <img src="./assets/images/trash.svg"/>
    </button>
        <div class="stat">
            <h3 class="rating">${rating}-</h3>
            <h3 class="position">${position}</h3>
        </div>
        <div class="profil">
            <img src="${playerPhoto}" alt="${name}">
        </div>
        <h2 class="name">${name}</h2>
        <p>${club}</p>
        <div class="nationality">${nationality} <img src="${playerFlag}" alt="${nationality}"></div>
    </div>
  `;
}
//-----------------------------------
// Display all players
function displayPlayers(players) {
    const content = players.map(card).join("");
    const cardsDiv = document.getElementById("cards");
    cardsDiv.innerHTML = content;
    // Add double-click event listeners to each card
    const cardsDeleteButtons = document.querySelectorAll(".card .delete");
    cardsDeleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (ev) {
            var _a;
            const target = ev.target;
            const playerId = (_a = target.closest(".card")) === null || _a === void 0 ? void 0 : _a.id;
            // ?.querySelector("#id") as HTMLElement;
            console.log(playerId);
            if (playerId) {
                deletePlayer(playerId);
                displayPlayers(getPlayers());
            }
        });
    });
}
// -----------------------------
//        remove player function
function deletePlayer(playerId) {
    let players = getPlayers();
    const updatedPlayers = players.filter((player) => player.id != Number(playerId));
    console.log(updatedPlayers);
    if (players.length !== updatedPlayers.length) {
        // save players , show green wlert , dislay palyers
        setPlayers(updatedPlayers);
        greenAlert("Player removed successfully");
        displayPlayers(updatedPlayers);
    }
    else {
        redAlert("Player not found");
    }
}
export { displayPlayers, updatePlayer, getPlayers, setPlayers, addPlayer, deletePlayer, };
