
function getId(){
     let id = Number(localStorage.getItem("id")) || 1
     return id
}

function setId(id){
     localStorage.setItem("id",id)
}

export {getId,setId} 