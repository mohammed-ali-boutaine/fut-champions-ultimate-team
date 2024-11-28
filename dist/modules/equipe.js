function getEquipe() {
    let equipeData = localStorage.getItem("equipe");
    if (equipeData) {
        try {
            const equipe = JSON.parse(equipeData);
            return equipe;
        }
        catch (error) {
            return [];
        }
    }
    return [];
}
function setEquipe(equipe) {
    localStorage.setItem("equipe", JSON.stringify(equipe));
}
export { getEquipe, setEquipe };
//# sourceMappingURL=equipe.js.map