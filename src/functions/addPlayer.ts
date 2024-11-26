import Player from "../modules/Player";
import { greenAlert, redAlert } from "./alert";

// Define the types for form elements
function addPlayer() {
  // Get data from form
  const name = document.getElementById("name") as HTMLInputElement;
  const position = document.getElementById("position") as HTMLInputElement;
  const nationality = document.getElementById("nationality") as HTMLSelectElement;
  const club = document.getElementById("club") as HTMLInputElement;
  const rating = document.getElementById("rating") as HTMLInputElement;

  // Form validation
  if (
    !name.value ||
    !position.value ||
    !nationality.value ||
    !club.value ||
    !rating.value
  ) {
    redAlert("All fields are required.");
    return;
  }

  // Create player object
  const player = new Player(
    name.value,
    position.value,
    nationality.value,
    club.value,
    parseInt(rating.value, 10)
  );
  console.log(player);

  // Make the POST request to add player
  fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to add player: ${res.statusText}`);
      }

      const message = await res.json(); // Await the response JSON
      greenAlert(`Player Added: ${message.name}`); // Display a success message (adjust message as needed)
    })
    .catch((error) => {
      redAlert(`Error: ${error.message}`);
    });

}

export { addPlayer };
