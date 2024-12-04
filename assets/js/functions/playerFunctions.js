import Player from "../modules/Player.js";
import { greenAlert, redAlert } from "./alert.js";
const playerId = document.getElementById("player-id");
const name = document.getElementById("name");
const position = document.getElementById("position");
const nationality = document.getElementById("nationality");
const club = document.getElementById("club");
const ratingInput = document.getElementById("rating");
//-----------------------------------
//       get Player function
function getPlayers() {
    let players = [];
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
    }
    return players;
}
//-----------------------------------
//      set Player function
function setPlayers(players) {
    localStorage.setItem("players", JSON.stringify(players));
}
//-----------------------------------
//      add Player function
// Add or update player function
function addPlayer() {
    try {
        let players = getPlayers();
        // Validate form inputs
        if (!(name === null || name === void 0 ? void 0 : name.value.trim()) ||
            !(position === null || position === void 0 ? void 0 : position.value.trim()) ||
            !(nationality === null || nationality === void 0 ? void 0 : nationality.value.trim()) ||
            !(club === null || club === void 0 ? void 0 : club.value.trim()) ||
            !(ratingInput === null || ratingInput === void 0 ? void 0 : ratingInput.value.trim())) {
            redAlert("All fields are required.");
            clearForm();
            return;
        }
        // Parse rating and player ID
        const rating = parseInt(ratingInput.value, 10) || 0;
        const id = parseInt(playerId.value, 10) || 0;
        if (playerId.value !== "") {
            // Update existing player
            let player = players.find((player) => player.id == Number(playerId.value));
            if (!player) {
                redAlert("error");
                return;
            }
            player.name = name.value;
            (player.position = position.value),
                (player.nationality = nationality.value);
            player.club = club.value;
            player.rating = rating;
            updatePlayer(player);
        }
        else {
            // Create Player instance
            const player = new Player(id, name.value, position.value, nationality.value, club.value, rating);
            // Assign new ID for new player
            const newId = players.length > 0 ? Number(players[players.length - 1].id) + 1 : 1;
            player.id = newId;
            // Add player to the list
            players.push(player);
            setPlayers(players);
            greenAlert("Player added successfully");
        }
    }
    catch (error) {
        redAlert("An unexpected error occurred. Please try again.");
    }
}
//-----------------------------------
// Update an existing player
function updatePlayer(updatedPlayer) {
    let players = getPlayers();
    const index = players.findIndex((player) => player.id == updatedPlayer.id);
    if (index !== -1) {
        players[index] = updatedPlayer;
        setPlayers(players);
        greenAlert("Player updated successfully");
    }
    else {
        redAlert("Player not found");
    }
    clearForm();
}
//-----------------------------------
// Generate HTML for a player card
function card(player) {
    let { id, photo, flag, nationality, rating, position, name, club } = player;
    const defaultPhoto = "./assets/images/unknown-player.png";
    const defaultFlag = "./assets/images/unknown-flag.png";
    let playerPhoto = photo ? photo : defaultPhoto;
    let playerFlag = flag ? flag : defaultFlag;
    if (rating == undefined) {
        rating = player._rating;
    }
    return `
    <div title="${player.name}" class="card" id="${id}">
    <a title="edit player" class="edit"">
    <img src="./assets/images/edit.svg"/>
    </a>
    <button  title="delete player" class="delete">
        <img src="./assets/images/trash.svg"/>
    </button>
        <div class="stat">
            <h3 class="rating">${rating}</h3>
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
    const cardsEditButtons = document.querySelectorAll(".card .edit");
    cardsEditButtons.forEach((btn) => {
        btn.addEventListener("click", function (ev) {
            var _a;
            const target = ev.target;
            const playerId = Number((_a = target.closest(".card")) === null || _a === void 0 ? void 0 : _a.id);
            if (playerId) {
                showEdit(playerId);
                displayPlayers(getPlayers());
            }
        });
    });
    cardsDeleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (ev) {
            var _a;
            const target = ev.target;
            const playerId = (_a = target.closest(".card")) === null || _a === void 0 ? void 0 : _a.id;
            if (playerId) {
                deletePlayer(playerId);
                displayPlayers(getPlayers());
            }
        });
    });
}
function showEdit(id) {
    const formContainer = document.getElementById("add-player-form");
    const player = getPlayers().find((player) => player.id == id);
    if (!player) {
        redAlert("Player not found.");
        return;
    }
    const formTitle = document.getElementById("form-title");
    playerId.value = String(player.id);
    name.value = player.name;
    position.value = player.position;
    nationality.value = player.nationality;
    club.value = player.club;
    ratingInput.value = String(player.rating);
    // Update form title to reflect edit mode
    if (formTitle) {
        formTitle.textContent = "Add Player";
    }
    formContainer.classList.remove("hidden");
}
// -----------------------------
//        remove player function
function deletePlayer(playerId) {
    let players = getPlayers();
    const updatedPlayers = players.filter((player) => player.id != Number(playerId));
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
function clearForm() {
    playerId.value = "";
    name.value = "";
    position.value = "";
    nationality.value = "";
    club.value = "";
    ratingInput.value = "";
}
export { displayPlayers, getPlayers, setPlayers, addPlayer, card };
