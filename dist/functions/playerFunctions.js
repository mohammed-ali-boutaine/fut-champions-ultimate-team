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
    console.log(players);
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
    // Get data from form
    const name = document.getElementById("name");
    const position = document.getElementById("position");
    const nationality = document.getElementById("nationality");
    const club = document.getElementById("club");
    const ratingInput = document.getElementById("rating");
    // Form validation
    if (!name.value ||
        !position.value ||
        !nationality.value ||
        !club.value ||
        !ratingInput.value) {
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
function card(player) {
    let { id, photo, flag, nationality, rating, position, name, club } = player;
    // console.log(player.rating);
    if (!rating) {
        rating = player._rating;
    }
    const defaultPhoto = "./assets/images/unknown-player.png";
    const defaultFlag = "./assets/images/unknown-flag.png";
    let playerPhoto = photo ? photo : defaultPhoto;
    let playerFlag = photo ? flag : defaultFlag;
    return `
    <div class="card" id="${id}">
    <a class="edit" href="./edit/?id=${id}">
    <img src="./assets/images/edit.svg"/>
    </a>
    <button class="delete">
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
function displayPlayers(players) {
    const content = players.map(card).join("");
    const cardsDiv = document.getElementById("cards");
    cardsDiv.innerHTML = content;
    // Add double-click event listeners to each card
    const cardsItems = document.querySelectorAll(".card");
    cardsItems.forEach((card) => {
        card.addEventListener("dblclick", function (ev) {
            var _a;
            const target = ev.target;
            const playerNameElement = (_a = target
                .closest(".card")) === null || _a === void 0 ? void 0 : _a.querySelector(".name");
            if (playerNameElement) {
                deletePlayer(playerNameElement.innerHTML);
                displayPlayers(getPlayers()); // Update the displayed players after removal
            }
        });
    });
}
// -----------------------------
//        remove player function
function deletePlayer(playerName) {
    let players = getPlayers();
    const updatedPlayers = players.filter((player) => player.name !== playerName);
    if (players.length !== updatedPlayers.length) {
        setPlayers(updatedPlayers);
        greenAlert("Player removed successfully");
        displayPlayers(updatedPlayers);
    }
    else {
        redAlert("Player not found");
    }
}
export { displayPlayers, updatePlayer, getPlayers, setPlayers, addPlayer, deletePlayer, };
