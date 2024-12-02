import { greenAlert, redAlert } from "./alert";
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
function addEquipePlayer(position, player) {
    let equipe = getEquipePlayers();
    // Check if the player already exists in the team
    const existingPlayer = equipe.find((equipePlayer) => equipePlayer.player.id === player.id);
    if (existingPlayer) {
        redAlert("Player already in the team.");
        return;
    }
    const equipePlayer = { position, player };
    equipe.push(equipePlayer);
    setEquipe(equipe);
    greenAlert("Player added to equipe successfully");
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
export { addEquipePlayer, removeEquipePlayer, showEquipePlayers, getEquipePlayers, setEquipe };
