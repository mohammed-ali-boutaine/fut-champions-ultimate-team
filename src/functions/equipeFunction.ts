import Player from "../modules/Player";
import { greenAlert, redAlert } from "./alert";

const equipePLayers: (Player | null)[] = Array(11).fill(null);


//-----------------------------------
// Get equipe players from local storage
function getEquipePlayers(): (Player | null)[] {
  let equipeData = localStorage.getItem("equipe");
  if (equipeData) {
    try {
      const equipePLayers: (Player | null)[] = JSON.parse(equipeData);
      return equipePLayers;
    } catch (error) {
      return [];
    }
  }
  return [];
}
//-------------------------------------
//-----------------------------------
// Save equipe players to local storage
function setEquipe(equipe: (Player | null)[]): void {
  localStorage.setItem("equipe", JSON.stringify(equipe));
}
//-----------------------------------
// Add a player to the equipe
function addEquipePlayer(index: number, player: Player) {
  let equipe: (Player | null)[] = getEquipePlayers();


  if (index < 0 || index >= equipe.length) {
    redAlert("Invalid index. Please choose a valid position.");
    return;
  }


  // Check if the player already exists in the team
  const existingPlayer:Player | null | undefined = equipe.find(
    (equipePlayer) => equipePlayer?.id === player.id
  );

  if (existingPlayer) {
    redAlert("Player already in the team.");
    return;
  }
  equipe[index] = player
  // const equipePlayer: EquipePlayer = { position, player };
  // equipe.push(equipePlayer);

  setEquipe(equipe);
  greenAlert("Player added to equipe successfully");
}

//-----------------------------------
// Remove a player from the equipe by name
function removeEquipePlayer(index:number) {
  
  let equipe = getEquipePlayers()

  if (index < 0 || index >= equipe.length) {
    redAlert("Invalid index. Please choose a valid position.");
    return;
  }

  equipe[index] = null
  setEquipe(equipe);
  greenAlert("Player removed from equipe successfully.");
}

//-----------------------------------
// Display the current team (for debugging)
function showEquipePlayers(): void {
  const equipe = getEquipePlayers();
  console.log(equipe);
}

export { addEquipePlayer, removeEquipePlayer, showEquipePlayers, getEquipePlayers, setEquipe };