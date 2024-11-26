import Player from "../modules/Player";
import { greenAlert, redAlert } from "./alert";

function addPlayer(){
     // get data from form
     const name = document.getElementById("name") as HTMLInputElement;
     const position = document.getElementById("position") as HTMLInputElement;
     const nationality = document.getElementById("nationality") as HTMLSelectElement;
     const club = document.getElementById("club") as HTMLInputElement;
     const rating = document.getElementById("rating") as HTMLInputElement;
     
     // form validation
     if (!name.value || !position.value || !nationality.value || !club.value || !rating.value) {
          redAlert("all input are required");
          return
     }else{
     // create player object
     const player = new Player(
          name.value,
          position.value,
          nationality.value,
          club.value,
          parseInt(rating.value, 10)
   );
   console.log(player);
   greenAlert("added sucsfly")
     }


   

   
     // add player and save in localstorage
     // equipe.push(player)
     // setEquipe(equipe)
     // inc id and save in localstorage
   }


   export {addPlayer}