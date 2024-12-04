import Player from "../modules/Player.js";
import { greenAlert, redAlert } from "./alert.js";
import { card } from "./playerFunctions.js";


//-----------------------------------
// Get equipe players from local storage
function getEquipePlayers(): (Player | null)[] {
  let equipeData = localStorage.getItem("equipe");
  if (equipeData) {
    try {
      const equipePlayers: (Player | null)[] = JSON.parse(equipeData);
      return equipePlayers;
    } catch (error) {
      // If parsing fails, initialize with an empty equipe
      const equipePlayers: (Player | null)[] = Array(11).fill(null);
      setEquipe(equipePlayers);
      return equipePlayers;
    }
  }
  // Return an empty equipe if no data is found in local storage
  return Array(11).fill(null);
}
//-----------------------------------
//-----------------------------------
// Save equipe players to local storage
function setEquipe(equipe: (Player | null)[]): void {
  localStorage.setItem("equipe", JSON.stringify(equipe));
}
//-----------------------------------
// Add a player to the equipe
function addEquipePlayer(index: number, player: Player| undefined) {

  if(player == undefined || !player){
    redAlert("error player is false")
    return
  }
  let equipe: (Player | null)[] = getEquipePlayers();

  if (index < 0 || index >= equipe.length) {
    redAlert("Invalid index. Please choose a valid position.");
    return;
  }

  // Check if the player already exists in the team
  const existingPlayer: Player | null | undefined = equipe.find(
    (equipePlayer) => equipePlayer?.id === player.id
  );

  if (existingPlayer) {
    redAlert("Player already in the team.");
    return;
  }
  equipe[index] = player;

  setEquipe(equipe);
  greenAlert("Player added to equipe successfully");
  showEquipePlayers()
}

//-----------------------------------
// Remove a player from the equipe by name
function removeEquipePlayer(index: number) {
  let equipe = getEquipePlayers();

  if (index < 0 || index >= equipe.length) {
    redAlert("Invalid index. Please choose a valid position.");
    return;
  }

  equipe[index] = null;
  setEquipe(equipe);
  greenAlert("Player removed from equipe successfully.");
}

//-----------------------------------
// Display the current team (for debugging)
function showEquipePlayers(): void {
  const equipe: (Player | null)[] = getEquipePlayers();

  let field = document.querySelectorAll(".field .player") as NodeListOf<HTMLDivElement>
  field.forEach( (playerDiv,index) =>{

    let player :Player | null = equipe[index]
    if(player != null){
      playerDiv.innerHTML = card(player) 
      
      // continue
    }else{
      playerDiv.innerHTML = `<img class="plus-image" src="./assets/images/plus.svg" alt="plus icon">`
    }      

  })
}

export {
  addEquipePlayer,
  removeEquipePlayer,
  showEquipePlayers,
  getEquipePlayers,
  setEquipe,
};
