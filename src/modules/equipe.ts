import Player from "./Player";

function getEquipe():Player[] {
  let equipeData = localStorage.getItem("equipe");
  if (equipeData) {
    try {
      const equipe: Player[] = JSON.parse(equipeData);
      return equipe;
    } catch (error) {
      console.error("Failed to parse equipe data from localStorage:", error);
      return [];
    }
  }

  return [];
}

function setEquipe(equipe: Player[]):void {
  localStorage.setItem("equipe", JSON.stringify(equipe));
}

export { getEquipe, setEquipe };
