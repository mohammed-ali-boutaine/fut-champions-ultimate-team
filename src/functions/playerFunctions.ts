import Player from "../modules/Player.js";
import { greenAlert, redAlert } from "./alert.js";


const playerId = document.getElementById("player-id") as HTMLInputElement;
const name = document.getElementById("name") as HTMLInputElement;
const position = document.getElementById("position") as HTMLInputElement;
const nationality = document.getElementById("nationality") as HTMLSelectElement;
const club = document.getElementById("club") as HTMLInputElement;
const ratingInput = document.getElementById("rating") as HTMLInputElement;
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
// Add or update player function
function addPlayer() {
  try {
    // Get data from form



    let players = getPlayers()
    // Validate form inputs
    if (
      !name?.value.trim() ||
      !position?.value.trim() ||
      !nationality?.value.trim() ||
      !club?.value.trim() ||
      !ratingInput?.value.trim()
    ) {
      redAlert("All fields are required.");
      clearForm()
      return;
    }

    // Parse rating and player ID
    const rating: number = parseInt(ratingInput.value, 10) || 0;
    const id: number = parseInt(playerId.value, 10) || 0;

    // let players = getPlayers();

    if (playerId.value !== "") {

      // Update existing player
      let player:Player | undefined = players.find( player => player.id == Number(playerId.value))
      if(!player){
        redAlert("error");
        return
      }

      player.name = name.value
      player.position = position.value,
      player.nationality =  nationality.value
      player.club = club.value
      player.rating = rating

      updatePlayer(player)
    } else {
          // Create Player instance
    const player = new Player(
      id,
      name.value,
      position.value,
      nationality.value,
      club.value,
      rating
    );
      // Assign new ID for new player
      const newId = players.length > 0 ? Number(players[players.length - 1].id) + 1 : 1;
      player.id = newId;

      // Add player to the list
      players.push(player);
      setPlayers(players);
      greenAlert("Player added successfully");
    }
  } catch (error) {
    console.error("Error handling player:", error);
    redAlert("An unexpected error occurred. Please try again.");
  }
}

//-----------------------------------
// Update an existing player

function updatePlayer(updatedPlayer: Player) {
  
console.log(updatedPlayer);

// use id
  let players: Player[] = getPlayers();
  const index = players.findIndex((player) => player.id == updatedPlayer.id);
  if (index !== -1) {
    players[index] = updatedPlayer;
    setPlayers(players);
    greenAlert("Player updated successfully");
  } else {
    redAlert("Player not found");
  }
    // Populate form with player's data
    const playerId = document.getElementById("player-id") as HTMLInputElement;

  clearForm()

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
function displayPlayers(players: Player[]) {
  const content = players.map(card).join("");
  const cardsDiv = document.getElementById("cards") as HTMLDivElement;
  cardsDiv.innerHTML = content;

  // Add double-click event listeners to each card
  const cardsDeleteButtons = document.querySelectorAll(
    ".card .delete"
  ) as NodeListOf<HTMLButtonElement>;

  const cardsEditButtons = document.querySelectorAll(
    ".card .edit"
  ) as NodeListOf<HTMLButtonElement>;
  cardsEditButtons.forEach((btn) => {
    btn.addEventListener("click", function (ev) {
      const target = ev.target as HTMLElement;
      const playerId = Number(target.closest(".card")?.id)
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

function showEdit(id:number){

  // console.log("id ",id);
  const formContainer = document.getElementById("add-player-form")as HTMLDivElement

  const player: Player | undefined = getPlayers().find((player) => player.id == id);


  // Handle case where player is not found
  if (!player) {
    redAlert("Player not found.");
    return;
  }

  const formTitle = document.getElementById("form-title") as HTMLHeadElement;


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
function clearForm(){

  playerId.value = "";
  name.value = "";
  position.value = "";
  nationality.value = "";
  club.value = "";
  ratingInput.value = "";
}

export {
  displayPlayers,
  getPlayers,
  setPlayers,
  addPlayer,
  card
};
