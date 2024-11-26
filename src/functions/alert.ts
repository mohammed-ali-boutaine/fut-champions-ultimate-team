function redAlert(message: string): void {
     // Create a new div element
     const div: HTMLDivElement = document.createElement("div");
     div.innerHTML = message; // Set the message
     div.classList.add("alert", "red-alert"); // Add classes for styling
 
     // Append the div to the body
     document.body.appendChild(div);
 
     // Remove the div after 3 seconds
     setTimeout(() => {
         div.remove();
     }, 3000);
 }
 
 function greenAlert(message: string): void {
     // Create a new div element
     const div: HTMLDivElement = document.createElement("div");
     div.innerHTML = message; // Set the message
     div.classList.add("alert", "green-alert"); // Add classes for styling
 
     // Append the div to the body
     document.body.appendChild(div);
 
     // Remove the div after 3 seconds
     setTimeout(() => {
         div.remove();
     }, 3000);
 }
 
 export { redAlert, greenAlert };
 