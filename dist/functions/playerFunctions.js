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
// Add or update player function
function addPlayer() {
    try {
        // Get data from form
        const playerId = document.getElementById("player-id");
        const name = document.getElementById("name");
        const position = document.getElementById("position");
        const nationality = document.getElementById("nationality");
        const club = document.getElementById("club");
        const ratingInput = document.getElementById("rating");
        let players = getPlayers();
        // Validate form inputs
        if (!(name === null || name === void 0 ? void 0 : name.value.trim()) ||
            !(position === null || position === void 0 ? void 0 : position.value.trim()) ||
            !(nationality === null || nationality === void 0 ? void 0 : nationality.value.trim()) ||
            !(club === null || club === void 0 ? void 0 : club.value.trim()) ||
            !(ratingInput === null || ratingInput === void 0 ? void 0 : ratingInput.value.trim())) {
            redAlert("All fields are required.");
            return;
        }
        // Parse rating and player ID
        const rating = parseInt(ratingInput.value, 10) || 0;
        const id = parseInt(playerId.value, 10) || 0;
        // let players = getPlayers();
        if (playerId.value !== "") {
            // Update existing player
            let player = players.find(player => player.id == Number(playerId.value));
            if (!player) {
                redAlert("error");
                return;
            }
            player.name = name.value;
            player.position = position.value,
                player.nationality = nationality.value;
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
        console.error("Error handling player:", error);
        redAlert("An unexpected error occurred. Please try again.");
    }
}
//-----------------------------------
// Update an existing player
function updatePlayer(updatedPlayer) {
    console.log(updatedPlayer);
    // use id
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
    // Populate form with player's data
    const playerId = document.getElementById("player-id");
    playerId.value = "";
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
    <a title="edit player" class="edit"">
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
    const cardsEditButtons = document.querySelectorAll(".card .edit");
    cardsEditButtons.forEach((btn) => {
        btn.addEventListener("click", function (ev) {
            var _a;
            const target = ev.target;
            const playerId = Number((_a = target.closest(".card")) === null || _a === void 0 ? void 0 : _a.id);
            // ?.querySelector("#id") as HTMLElement;
            // console.log(playerId);
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
            // ?.querySelector("#id") as HTMLElement;
            console.log(playerId);
            if (playerId) {
                deletePlayer(playerId);
                displayPlayers(getPlayers());
            }
        });
    });
}
function showEdit(id) {
    // console.log("id ",id);
    const formContainer = document.getElementById("add-player-form");
    const player = getPlayers().find((player) => player.id == id);
    // Handle case where player is not found
    if (!player) {
        redAlert("Player not found.");
        return;
    }
    // Get form elements
    const playerId = document.getElementById("player-id");
    const name = document.getElementById("name");
    const position = document.getElementById("position");
    const nationality = document.getElementById("nationality");
    const club = document.getElementById("club");
    const ratingInput = document.getElementById("rating");
    const formTitle = document.getElementById("form-title");
    // Populate form with player's data
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
