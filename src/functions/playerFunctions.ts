import Player from "../modules/Player";
import { greenAlert, redAlert } from "./alert";

//-----------------------------------
//       get Player function
function getPlayers(): Player[] {
  let players: Player[] = [];
  const storedPlayers = localStorage.getItem("players");
  if (storedPlayers) {
    players = JSON.parse(storedPlayers);
  }
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
  // get data from form
  const name = document.getElementById("name") as HTMLInputElement;
  const position = document.getElementById("position") as HTMLInputElement;
  const nationality = document.getElementById(
    "nationality"
  ) as HTMLSelectElement;
  const club = document.getElementById("club") as HTMLInputElement;
  const rating = document.getElementById("rating") as HTMLInputElement;

  // Form validation
  if (
    !name.value ||
    !position.value ||
    !nationality.value ||
    !club.value ||
    !rating.value
  ) {
    redAlert("All fields are required.");
    return;
  } else {
    // Create player object
    const player = new Player(
      name.value,
      position.value,
      nationality.value,
      club.value,
      parseInt(rating.value, 10)
    );

    // Get existing players, add the new player, and save back to localStorage
    const players = getPlayers();
    players.push(player);
    setPlayers(players);

    greenAlert("Player added successfully");
  }
}

function updatePlayer(updatedPlayer: Player) {
     let players : Player[] = getPlayers();
     const index = players.findIndex(player => player.name === updatedPlayer.name);
     if (index !== -1) {
         players[index] = updatedPlayer;
         setPlayers(players);
         greenAlert("Player updated successfully");
     } else {
         redAlert("Player not found");
     }
 }
//-----------------------------------
 function card(player: Player): string {
     return `
     <div class="card">
         <div class="stat">
             <h3 class="rating">${player.rating}</h3>
             <h3 class="position">${player.position}</h3>
         </div>
         <div class="profil">
             <img src="${player.photo}" alt="${player.name}">
         </div>
         <h2 class="name">${player.name}</h2>
         <p>${player.club}</p>
         <div class="nationality">${player.nationality} <img src="${player.flag}" alt="${player.nationality}"></div>
     </div>
     `;
 }
 function displayPlayers(players: Player[]) {
     const content = players.map(card).join("");
     const cardsDiv = document.getElementById("cards") as HTMLDivElement;
     cardsDiv.innerHTML = content;

         // Add double-click event listeners to each card
    const cardsItems = document.querySelectorAll(".card") as NodeListOf<HTMLDivElement>;
    cardsItems.forEach(card => {
     card.addEventListener("dblclick", function(ev) {
         const target = ev.target as HTMLElement;
         const playerNameElement = target.closest(".card")?.querySelector(".name") as HTMLElement;
         if (playerNameElement) {
             removePlayer(playerNameElement.innerHTML);
             displayPlayers(getPlayers()); // Update the displayed players after removal
         }
     });
 });
 }
// -----------------------------
//        remove player function

function removePlayer(playerName: string) {
    let players = getPlayers();
    const updatedPlayers = players.filter(player => player.name !== playerName);
    if (players.length !== updatedPlayers.length) {
        setPlayers(updatedPlayers);
        greenAlert("Player removed successfully");
        displayPlayers(updatedPlayers);
    } else {
        redAlert("Player not found");
    }
}

export { displayPlayers,updatePlayer,getPlayers, setPlayers, addPlayer, removePlayer };
