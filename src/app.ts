import { getEquipe,setEquipe } from "./modules/equipe";
import Player from "./modules/Player";
import { redAlert,greenAlert } from "./functions/alert";

 let equipe : Player[] = getEquipe()
console.log(equipe);



const url = "http://localhost:3000/players"
async function showData(){
     try {
          const res = await fetch(url);
          const players = await res.json();
      
          let content = players.map(card).join("");
      
          const cardsDiv = document.getElementById("cards") as HTMLDivElement;
          cardsDiv.innerHTML = content;
        } catch (error) {
          redAlert("Error fetching players:"+error);
        }

}

showData()

function card(player: Player): string {
     return `
     <div class="card">
       <div class="stat">
         <h3 class="rating">${player.rating}</h3>
         <h3 class="position">${player.position}</h3>
       </div>
       <div class="profil">
         <img src="${player.photo}" alt="${player.name}">
       </div>
       <h2>${player.name}</h2>
       <p>${player.club}</p>
       <div class="nationality">${player.nationality} <img src="${player.flag}" alt="${player.nationality}"></div>
     </div>
   `;
 }
 

