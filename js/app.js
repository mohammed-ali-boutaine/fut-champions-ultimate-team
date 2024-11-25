import { getEquipe, setEquipe } from "./modules/equipe";
import { setId,getId } from "./modules/id";


let id= getId();
let equipe = getEquipe()


fetch('http://localhost:3000/players')
  .then((response) => response.json())
  .then((data) =>{ 
     
     console.log('Products:', data)


})
  .catch((error) => {
     console.error('Error fetching products:', error)
     alert("server problem")


});


const positions = [
  { name: "Goalkeeper", short: "GK" },
  { name: "Center-back", short: "CB" },
  { name: "Full-back", short: "FB" },
  { name: "Wing-back", short: "WB" },
  { name: "Defensive Midfielder", short: "CDM" },
  { name: "Central Midfielder", short: "CM" },
  { name: "Attacking Midfielder", short: "CAM" },
  { name: "Wide Midfielder", short: "LM/RM" },
  { name: "Striker", short: "ST" },
  { name: "Center Forward", short: "CF" },
  { name: "Winger", short: "LW/RW" },
  { name: "Second Striker", short: "SS" }
];


//////////////////////////////////////////


function addPalyer(){
  // get data from form
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const nationality = document.getElementById("nationality").value;
  const club = document.getElementById("club").value;
  const rating = document.getElementById("rating").value;
  
  // form validation
  

  // 
  const player = {
    id,
    photo: null,
    name,
    position,
    nationality,
    club,
    rating,
  };

  // add player and save in localstorage
  equipe.push(player)
  setEquipe(equipe)
  // inc id and save in localstorage
  id++
  setId(id)
}


function showSquad(players){


}