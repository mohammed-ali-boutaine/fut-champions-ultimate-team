import { greenAlert, redAlert } from "./alert";


function removePlayer(id:number):void{
     fetch(`http://localhost:3000/players/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          if(!res.ok){
               throw new Error(`Failed to remove player: ${res.statusText}`);
          }

          const message = await res.json();
          greenAlert(`Player removed: ${message.name}`); 
        })
        .catch((error) => {
          redAlert(`Error: ${error.message}`);
        });
}

export {removePlayer}