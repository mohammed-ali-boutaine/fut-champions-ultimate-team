import { greenAlert, redAlert } from "./alert.js";
import { card } from "./playerFunctions.js";
//-----------------------------------
// Get equipe players from local storage
function getEquipePlayers() {
    let equipeData = localStorage.getItem("equipe");
    if (equipeData) {
        try {
            const equipePlayers = JSON.parse(equipeData);
            return equipePlayers;
        }
        catch (error) {
            // If parsing fails, initialize with an empty equipe
            const equipePlayers = Array(11).fill(null);
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
function setEquipe(equipe) {
    localStorage.setItem("equipe", JSON.stringify(equipe));
}
//-----------------------------------
// Add a player to the equipe
function addEquipePlayer(index, player) {
    if (player == undefined || !player) {
        redAlert("error player is false");
        return;
    }
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
    setEquipe(equipe);
    greenAlert("Player added to equipe successfully");
    showEquipePlayers();
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
    let field = document.querySelectorAll(".field .player");
    field.forEach((playerDiv, index) => {
        console.log(equipe);
        let player = equipe[index];
        if (player != null) {
            playerDiv.innerHTML = card(player);
            // continue
        }
        else {
            playerDiv.innerHTML = `<img class="plus-image" src="./assets/images/plus.svg" alt="plus icon">`;
        }
        console.log(true);
    });
}
export { addEquipePlayer, removeEquipePlayer, showEquipePlayers, getEquipePlayers, setEquipe, };
