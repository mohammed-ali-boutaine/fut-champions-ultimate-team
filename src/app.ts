// import Player from "./modules/Player.ts";
import { redAlert, greenAlert } from "./functions/alert";
import { addPlayer, displayPlayers, getPlayers, removePlayer, setPlayers } from "./functions/playerFunctions";
import Player from "./modules/Player";

const url = "http://localhost:3000/players";

async function showData() {
    let players:Player[] = getPlayers();
    if (players.length === 0) {
        try {
            const res = await fetch(url);
            players = await res.json();
            setPlayers(players);
        } catch (error) {
            redAlert("Error fetching players: " + error);
            return;
        }
    }
    displayPlayers(players);
}

const formContainer = document.getElementById("add-player-form") as HTMLDivElement

document.querySelector("#add-player-form form")?.addEventListener("submit", function (ev) {
    ev.preventDefault();
    addPlayer();
    formContainer.classList.toggle("hidden");

    displayPlayers(getPlayers());
});

const playerDivs = document.querySelectorAll(".player") as NodeListOf<HTMLDivElement>

playerDivs.forEach(playerDiv =>{
    playerDiv.addEventListener("click",function(ev){
        document.querySelector(".cards")?.classList.add("shaking")
       console.log(ev);
       
    })
    
})


showData();