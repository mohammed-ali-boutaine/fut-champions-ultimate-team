var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// import Player from "./modules/Player.ts";
import { redAlert } from "./functions/alert.js";
import { addPlayer, displayPlayers, getPlayers, setPlayers } from "./functions/playerFunctions.js";
const url = "http://localhost:3000/players";
function showData() {
    return __awaiter(this, void 0, void 0, function* () {
        let players = getPlayers();
        if (players.length === 0) {
            try {
                const res = yield fetch(url);
                players = yield res.json();
                setPlayers(players);
            }
            catch (error) {
                redAlert("Error fetching players: " + error);
                return;
            }
        }
        displayPlayers(players);
    });
}
(_a = document.querySelector("#add-player-form form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (ev) {
    ev.preventDefault();
    addPlayer();
    displayPlayers(getPlayers());
});
showData();
//# sourceMappingURL=app.js.map