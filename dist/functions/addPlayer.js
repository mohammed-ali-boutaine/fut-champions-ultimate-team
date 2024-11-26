import Player from "../modules/Player.js";
import { redAlert } from "./alert.js";
function addPalyer() {
    // get data from form
    const name = document.getElementById("name");
    const position = document.getElementById("position");
    const nationality = document.getElementById("nationality");
    const club = document.getElementById("club");
    const rating = document.getElementById("rating");
    // form validation
    if (!name.value || !position.value || !nationality.value || !club.value || !rating.value) {
        redAlert("all input are required");
    }
    // create player object
    const player = new Player(name.value, position.value, nationality.value, club.value, parseInt(rating.value, 10));
    console.log(player);
    // add player and save in localstorage
    // equipe.push(player)
    // setEquipe(equipe)
    // inc id and save in localstorage
}
export { addPalyer };
