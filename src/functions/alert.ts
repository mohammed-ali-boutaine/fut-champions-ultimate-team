// create alert , insert it to body , remove it after 3s

function redAlert(message: string): void {
     const div: HTMLDivElement = document.createElement("div");
     div.innerHTML = message; 
     div.classList.add("alert", "red-alert"); 
 
     document.body.appendChild(div);
 
     setTimeout(() => {
         div.remove();
     }, 3000);
 }
 
 function greenAlert(message: string): void {

    // create alert , insert it to body , remove it after 3s
    const div: HTMLDivElement = document.createElement("div");
     div.innerHTML = message; 
     div.classList.add("alert", "green-alert"); 
 
     document.body.appendChild(div);
 
     setTimeout(() => {
         div.remove();
     }, 3000);
 }
 
 export { redAlert, greenAlert };
 