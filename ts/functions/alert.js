"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redAlert = redAlert;
exports.greenAlert = greenAlert;
function redAlert(message) {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("alert red-alert");
    document.appendChild(div);
    setInterval(() => {
        div.remove();
    }, 3000);
}
function greenAlert(message) {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("alert", "green-alert");
    document.body.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 3000);
}
