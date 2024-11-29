import { greenAlert, redAlert } from "./alert.js";
function getEquipePlayers() {
    let equipeData = localStorage.getItem("equipe");
    if (equipeData) {
        try {
            const localStorageEquipe = JSON.parse(equipeData);
            return localStorageEquipe;
        }
        catch (error) {
            return [];
        }
    }
    return [];
}
//-------------------------------------
function setEquipe(equipe) {
    localStorage.setItem("equipe", JSON.stringify(equipe));
}
// add player to equipe
// Formation 4-3-3 : Comprend 1 GK, 2 CB (Défenseurs centraux), 1 LB (Latéral gauche), 1 RB (Latéral droit), 3 CM (Milieux centraux), 1 LW (Ailier gauche), 1 RW (Ailier droit), et 1 ST (Attaquant central)
// const positions = [
//   { name: "Goalkeeper", short: "GK" },
//   { name: "Center-back", short: "CB" },
//   { name: "Full-back", short: "FB" },
//   { name: "Wing-back", short: "WB" },
//   { name: "Defensive Midfielder", short: "CDM" },
//   { name: "Central Midfielder", short: "CM" },
//   { name: "Attacking Midfielder", short: "CAM" },
//   { name: "Wide Midfielder", short: "LM/RM" },
//   { name: "Striker", short: "ST" },
//   { name: "Center Forward", short: "CF" },
//   { name: "Winger", short: "LW/RW" },
//   { name: "Second Striker", short: "SS" }
// ];
function addEquipePlayer(position, player) {
    let equipe = getEquipePlayers();
    // Check if the player already exists in the team
    const existingPlayer = equipe.find((equipePlayer) => equipePlayer.player === player);
    if (existingPlayer) {
        redAlert("Player already in the team.");
        return;
    }
    const equipePlayer = { position, player };
    equipe.push(equipePlayer);
    setEquipe(equipe);
    greenAlert("player added to equipe seccusfly");
}
function removeEquipePlayer(playerName) {
    let equipe = getEquipePlayers();
    const updatedEquipe = equipe.filter((equipePlayer) => equipePlayer.player.name !== playerName);
    if (updatedEquipe.length === equipe.length) {
        redAlert("Player not found in the team.");
        return;
    }
    setEquipe(updatedEquipe);
    greenAlert("Player removed from equipe successfully.");
}
// Display the current team (for debugging)
function showEquipePlayers() {
    const equipe = getEquipePlayers();
    console.log(equipe);
}
