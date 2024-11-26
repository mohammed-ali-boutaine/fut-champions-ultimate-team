"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEquipe = getEquipe;
exports.setEquipe = setEquipe;
function getEquipe() {
    let equipeData = localStorage.getItem("equipe");
    if (equipeData) {
        try {
            const equipe = JSON.parse(equipeData);
            return equipe;
        }
        catch (error) {
            console.error("Failed to parse equipe data from localStorage:", error);
            return [];
        }
    }
    return [];
}
function setEquipe(equipe) {
    localStorage.setItem("equipe", JSON.stringify(equipe));
}
