const canvas = document.querySelector('canvas');
const playButton = document.getElementById("play");
const closeButton = document.getElementById("close");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const reloadButton = document.getElementById("reload");
const collision = document.querySelector("#collision");
let ctx = canvas.getContext("2d");
let yellowBallRadius = 20;
let redBallRadius = 30;
let yellowX = canvas.width / 2;
let yellowY = yellowBallRadius;
let redX = redBallRadius;
let redY = canvas.height / 2;
let yellowDy = 2;
let redDx = 2;
let animationInterval;

function drawYellowBall() {
    ctx.beginPath();
    ctx.arc(yellowX, yellowY, yellowBallRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'goldenrod';
    ctx.fill();
    ctx.closePath();
}

function drawRedBall() {
    ctx.beginPath();
    ctx.arc(redX, redY, redBallRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawYellowBall();
    drawRedBall();

    if (yellowY + yellowDy > canvas.height - yellowBallRadius || yellowY + yellowDy < yellowBallRadius) {
        yellowDy = -yellowDy;
        logEvent("Жовтий круг доторкнувся до стінки");
    }
    yellowY += yellowDy;

    if (redX + redDx > canvas.width - redBallRadius || redX + redDx < redBallRadius) {
        redDx = -redDx;
        logEvent("Червоний круг доторкнувся до стінки");
    }
    redX += redDx;

    if (checkCollision()) {
        collision.style.display = "inline";
        stopButton.style.display = "none";
        reloadButton.style.display = "inline";
        clearInterval(animationInterval);
        logEvent("Менший круг перекрився більшим");
    } else {
        collision.style.display = "none";
    }


}


function logEvent(message) {
    const time = new Date().toISOString();
    const event = { id: Date.now(), message, time };
    saveToLocal(event);

    fetch("/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });
}

function saveToLocal(event) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}

playButton.addEventListener("click", () => {
    playButton.style.display = "none";
    closeButton.style.display = "inline";
    startButton.style.display = "inline";
    logEvent("Натиснуто кнопку Почати анімацію");
});

closeButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    yellowX = canvas.width / 2;
    yellowY = yellowBallRadius;
    redX = redBallRadius;
    redY = canvas.height / 2;
    yellowDy = 2;
    redDx = 2;

    playButton.style.display = "inline";
    closeButton.style.display = "none";
    startButton.style.display = "none";
    stopButton.style.display = "none";
    reloadButton.style.display = "none";
    collision.style.display = "none";
    clearInterval(animationInterval);

    renderTables();
});

reloadButton.addEventListener("click", () => {
    yellowX = canvas.width / 2;
    yellowY = yellowBallRadius;
    redX = redBallRadius;
    redY = canvas.height / 2;

    yellowDy = getRandomSpeed(1, 5) * (Math.random() > 0.5 ? 1 : -1);
    redDx = getRandomSpeed(1, 5) * (Math.random() > 0.5 ? 1 : -1);

    reloadButton.style.display = "none";
    startButton.style.display = "inline";
    collision.style.display = "none";

    logEvent("Натиснуто кнопку Перезавантажити");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawYellowBall();
    drawRedBall();
});

startButton.addEventListener("click", () => {
    if (!animationInterval) {
        yellowDy = getRandomSpeed(1, 5) * (Math.random() > 0.5 ? 1 : -1);
        redDx = getRandomSpeed(1, 5) * (Math.random() > 0.5 ? 1 : -1);
    }
    startButton.style.display = "none";
    stopButton.style.display = "inline";
    logEvent("Натиснуто кнопку Почати");
    animationInterval = setInterval(draw, 10);
});


stopButton.addEventListener("click", () => {
    stopButton.style.display = "none";
    reloadButton.style.display = "inline";
    clearInterval(animationInterval);
    logEvent("Натиснуто кнопку Стоп");
});


function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function checkCollision() {
    const distance = calculateDistance(yellowX, yellowY, redX, redY);

    if (distance + yellowBallRadius <= redBallRadius) {
        return true;
    }
    return false;
}

function getRandomSpeed(min, max) {
    return Math.random() * (max - min) + min;
}

function renderTables() {
    const localEvents = JSON.parse(localStorage.getItem("events")) || [];
    const localTable = document.getElementById("local-events");
    localTable.innerHTML = localEvents
        .map(
            (event, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${event.message}</td>
                <td>${new Date(event.time).toLocaleTimeString()}</td>
                <td>--</td>
            </tr>`
        )
        .join("");

    fetch("/events")
        .then((response) => response.json())
        .then((serverEvents) => {
            const serverTable = document.getElementById("server-events");
            serverTable.innerHTML = serverEvents
                .map(
                    (event, i) => `
                <tr>
                    <td>${i + 1}</td>
                    <td>${event.message}</td>
                    <td>${new Date(event.clientTime).toLocaleTimeString()}</td>
                    <td>${new Date(event.serverTime).toLocaleTimeString()}</td>
                </tr>`
                )
                .join("");
        });
}
