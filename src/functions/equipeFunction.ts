import Player from "../modules/Player";
import { greenAlert, redAlert } from "./alert";

// Interface for EquipePlayer
interface EquipePlayer {
  position: string;
  player: Player;
}


//-----------------------------------
// Get equipe players from local storage
function getEquipePlayers(): EquipePlayer[] {
  let equipeData = localStorage.getItem("equipe");
  if (equipeData) {
    try {
      const localStorageEquipe: EquipePlayer[] = JSON.parse(equipeData);
      return localStorageEquipe;
    } catch (error) {
      return [];
    }
  }
  return [];
}
//-------------------------------------
//-----------------------------------
// Save equipe players to local storage
function setEquipe(equipe: EquipePlayer[]): void {
  localStorage.setItem("equipe", JSON.stringify(equipe));
}
//-----------------------------------
// Add a player to the equipe
// Formation 4-3-3: Includes 1 GK, 2 CB, 1 LB, 1 RB, 3 CM, 1 LW, 1 RW, and 1 ST
function addEquipePlayer(position: string, player: Player) {
  let equipe: EquipePlayer[] = getEquipePlayers();

  // Check if the player already exists in the team
  const existingPlayer = equipe.find(
    (equipePlayer) => equipePlayer.player.id === player.id
  );

  if (existingPlayer) {
    redAlert("Player already in the team.");
    return;
  }

  const equipePlayer: EquipePlayer = { position, player };
  equipe.push(equipePlayer);
  setEquipe(equipe);
  greenAlert("Player added to equipe successfully");
}

//-----------------------------------
// Remove a player from the equipe by name
function removeEquipePlayer(playerName: string) {
  let equipe: EquipePlayer[] = getEquipePlayers();

  const updatedEquipe = equipe.filter(
    (equipePlayer) => equipePlayer.player.name !== playerName
  );

  if (updatedEquipe.length === equipe.length) {
    redAlert("Player not found in the team.");
    return;
  }

  setEquipe(updatedEquipe);
  greenAlert("Player removed from equipe successfully.");
}

//-----------------------------------
// Display the current team (for debugging)
function showEquipePlayers(): void {
  const equipe = getEquipePlayers();
  console.log(equipe);
}

export { addEquipePlayer, removeEquipePlayer, showEquipePlayers, getEquipePlayers, setEquipe };