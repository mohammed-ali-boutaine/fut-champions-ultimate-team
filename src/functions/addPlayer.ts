
function addPalyer(){
     // get data from form
     const name = document.getElementById("name") as HTMLInputElement;
     const position = document.getElementById("position") as HTMLInputElement;
     const nationality = document.getElementById("nationality") as HTMLSelectElement;
     const club = document.getElementById("club") as HTMLInputElement;
     const rating = document.getElementById("rating") as HTMLInputElement;
     
     // form validation
// form validation
     if (!name.value || !position.value || !nationality.value || !club.value || !rating.value) {
          alert("all input are required");
     }
     
   
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