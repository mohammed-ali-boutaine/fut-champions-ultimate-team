import { greenAlert, redAlert } from "./alert";
const equipePLayers = Array(11).fill(null);
//-----------------------------------
// Get equipe players from local storage
function getEquipePlayers() {
    let equipeData = localStorage.getItem("equipe");
    if (equipeData) {
        try {
            const equipePLayers = JSON.parse(equipeData);
            return equipePLayers;
        }
        catch (error) {
            return [];
        }
    }
    return [];
}
//-------------------------------------
//-----------------------------------
// Save equipe players to local storage
function setEquipe(equipe) {
    localStorage.setItem("equipe", JSON.stringify(equipe));
}
//-----------------------------------
// Add a player to the equipe
function addEquipePlayer(index, player) {
    let equipe = getEquipePlayers();
    if (index < 0 || index >= equipe.length) {
        redAlert("Invalid index. Please choose a valid position.");
        return;
    }
    // Check if the player already exists in the team
    const existingPlayer = equipe.find((equipePlayer) => (equipePlayer === null || equipePlayer === void 0 ? void 0 : equipePlayer.id) === player.id);
    if (existingPlayer) {
        redAlert("Player already in the team.");
        return;
    }
    equipe[index] = player;
    // const equipePlayer: EquipePlayer = { position, player };
    // equipe.push(equipePlayer);
    setEquipe(equipe);
    greenAlert("Player added to equipe successfully");
}
//-----------------------------------
// Remove a player from the equipe by name
function removeEquipePlayer(index) {
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
function showEquipePlayers() {
    const equipe = getEquipePlayers();
    console.log(equipe);
}
export { addEquipePlayer, removeEquipePlayer, showEquipePlayers, getEquipePlayers, setEquipe };
