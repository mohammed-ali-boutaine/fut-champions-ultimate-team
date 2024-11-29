function createAlert(message: string, type: string): void {
    const div: HTMLDivElement = document.createElement("div");
    div.innerHTML = message;
    div.classList.add("alert", type);

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

function redAlert(message: string): void {
    createAlert(message, "red-alert");
}

function greenAlert(message: string): void {
    createAlert(message, "green-alert");
}

export { redAlert, greenAlert };