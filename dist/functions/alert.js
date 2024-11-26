function redAlert(message) {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("alert","red-alert")
    document.body.appendChild(div);
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
export { redAlert, greenAlert };
