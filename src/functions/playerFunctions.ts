import Player from "../modules/Player.js";
import { greenAlert, redAlert } from "./alert.js";

//-----------------------------------
//       get Player function
function getPlayers(): Player[] {
  let players: Player[] = [];
  const storedPlayers = localStorage.getItem("players");
  if (storedPlayers) {
    players = JSON.parse(storedPlayers);
  }
  // console.log(players);

  return players;
}
//-----------------------------------
//      set Player function

function setPlayers(players: Player[]): void {
  localStorage.setItem("players", JSON.stringify(players));
}
//-----------------------------------
//      add Player function
function addPlayer() {
  try {
    // Get data from form
    const name = document.getElementById("name") as HTMLInputElement;
    const position = document.getElementById("position") as HTMLInputElement;
    const nationality = document.getElementById(
      "nationality"
    ) as HTMLSelectElement;
    const club = document.getElementById("club") as HTMLInputElement;
    const ratingInput = document.getElementById("rating") as HTMLInputElement;

    // Form validation
    // Validate form inputs
    if (
      !name?.value.trim() ||
      !position?.value.trim() ||
      !nationality?.value.trim() ||
      !club?.value.trim() ||
      !ratingInput?.value.trim()
    ) {
      redAlert("All fields are required.");
      return;
    }

    // Create player object
    const rating: number = parseInt(ratingInput.value, 10) || 0;
    let players = getPlayers();
    let id = players.length > 0 ? players[players.length - 1].id + 1 : 1;

    const player = new Player(
      id,
      name.value,
      position.value,
      nationality.value,
      club.value,
      rating
    );
    console.log(player);
    console.log(players);

    // Add player to list
    players.push(player);
    setPlayers(players);

    greenAlert("Player added successfully");
  } catch (error) {
    console.error("Error adding player:", error);
    redAlert("An unexpected error occurred. Please try again.");
  }
}

//-----------------------------------
// Update an existing player

function updatePlayer(updatedPlayer: Player) {
  let players: Player[] = getPlayers();
  const index = players.findIndex((player) => player.id === updatedPlayer.id);
  if (index !== -1) {
    players[index] = updatedPlayer;
    setPlayers(players);
    greenAlert("Player updated successfully");
  } else {
    redAlert("Player not found");
  }
}

//-----------------------------------
// Generate HTML for a player card
function card(player: Player): string {
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
function displayPlayers(players: Player[]) {
  const content = players.map(card).join("");
  const cardsDiv = document.getElementById("cards") as HTMLDivElement;
  cardsDiv.innerHTML = content;

  // Add double-click event listeners to each card
  const cardsDeleteButtons = document.querySelectorAll(
    ".card .delete"
  ) as NodeListOf<HTMLButtonElement>;

  cardsDeleteButtons.forEach((btn) => {
    btn.addEventListener("click", function (ev) {
      const target = ev.target as HTMLElement;
      const playerId = target.closest(".card")?.id;
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

function deletePlayer(playerId: string) {
  let players = getPlayers();
  const updatedPlayers = players.filter(
    (player) => player.id != Number(playerId)
  );
  console.log(updatedPlayers);

  if (players.length !== updatedPlayers.length) {
    // save players , show green wlert , dislay palyers
    setPlayers(updatedPlayers);
    greenAlert("Player removed successfully");
    displayPlayers(updatedPlayers);
  } else {
    redAlert("Player not found");
  }
}

export {
  displayPlayers,
  updatePlayer,
  getPlayers,
  setPlayers,
  addPlayer,
  deletePlayer,
};
