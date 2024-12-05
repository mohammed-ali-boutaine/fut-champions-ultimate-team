// Function to create an alert message
function createAlert(message, type) {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("alert", type);
    document.body.appendChild(div);
    // remove the alert after 3 seconds
    setTimeout(() => {
        div.remove();
    }, 3000);
}
// Function to create a red alert
function redAlert(message) {
    createAlert(message, "red-alert");
}
// Function to create a green alert
function greenAlert(message) {
    createAlert(message, "green-alert");
}
export { redAlert, greenAlert };
