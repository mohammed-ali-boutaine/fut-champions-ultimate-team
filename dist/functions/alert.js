function createAlert(message, type) {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("alert", type);
    document.body.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 3000);
}
function redAlert(message) {
    createAlert(message, "red-alert");
}
function greenAlert(message) {
    createAlert(message, "green-alert");
}
export { redAlert, greenAlert };
