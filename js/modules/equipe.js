
function getEquipe(){
     let equipe = JSON.parse(localStorage.getItem("equipe")) || []

     return equipe
}

function setEquipe(equipe){
     localStorage.setItem("equipe",equipe)
}

export {getEquipe,setEquipe} 