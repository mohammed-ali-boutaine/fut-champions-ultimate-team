// Function to create an alert message
function createAlert(message: string, type: string): void {
    const div: HTMLDivElement = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("alert", type);

    document.body.appendChild(div);

    // Remove the alert after 3 seconds
    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Function to create a red alert
function redAlert(message: string): void {
    createAlert(message, "red-alert");
}

// Function to create a green alert
function greenAlert(message: string): void {
    createAlert(message, "green-alert");
}

export { redAlert, greenAlert };