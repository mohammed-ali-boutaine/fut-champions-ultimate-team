var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var _a;
import { redAlert } from "./functions/alert.js";
import { addPalyer } from "./functions/addPlayer.js";
//  let equipe : Player[] = getEquipe()
// console.log(equipe);
const url = "http://localhost:3000/players";
function showData() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const res = yield fetch(url);
      const players = yield res.json();
      let content = players.map(card).join("");
      const cardsDiv = document.getElementById("cards");
      cardsDiv.innerHTML = content;
    } catch (error) {
      redAlert("Error fetching players:" + error);
    }
  });
}
showData();
function card(player) {
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
(_a = document.querySelector("#add-player-form form")) === null || _a === void 0
  ? void 0
  : _a.addEventListener("submit", function (ev) {
      console.log("submited");
      ev.preventDefault();
      addPalyer();
    });
