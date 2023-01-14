const ws = new WebSocket('ws://192.168.1.155:1880/receive');
const wsTimer = new WebSocket('ws://192.168.1.155:1880/receiveTimer');
// const ws = new WebSocket('ws://127.0.0.1:1880/receive');
// const wsTimer = new WebSocket('ws://127.0.0.1:1880/receiveTimer');
const matchLength = 150;
let timeRemaining = matchLength;
let timerPaused = false;
let running = false;

ws.onopen = (event) => {
    console.log(`Connected to ${event.target.url} succesfully`);
}

wsTimer.onopen = (event) => {
    console.log(`Connected to ${event.target.url} successfully`);
}

const weightClassSelector = document.getElementById('weight-class-select');
const redBotSelector = document.getElementById('red-select');
const blueBotSelector = document.getElementById('blue-select');
const matchSelector = document.getElementById('match-select');
const updateBtn = document.getElementById('update-btn');

const resetBtn = document.getElementById('reset-timer');
const pauseBtn = document.getElementById('pause-timer');
const startBtn = document.getElementById('start-timer');

updateBtn.addEventListener('click', () => {
    let weightClass = weightClassSelector.value;
    let redBot = redBotSelector.value;
    let blueBot = blueBotSelector.value;
    let match = matchSelector.value;

    console.log(`${redBot} (red) is fighting ${blueBot} (blue) in the ${weightClass} class in ${match}`);
    message = `${redBot};${blueBot};${weightClass};${match}`;
    ws.send(message);
})


function countDown() {
    console.log(`There are ${timeRemaining} seconds remaining`);
    if (!timerPaused) {
        timeRemaining -= 1;
    }
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
    }
    wsTimer.send(timeRemaining);
}

// timerInterval = setInterval(countDown, 1000);

resetBtn.addEventListener('click', () => {
    running = false;
    clearInterval(timerInterval);
    timeRemaining = matchLength;
    wsTimer.send(timeRemaining);
})
pauseBtn.addEventListener('click', () => {
    timerPaused = !timerPaused;
})
startBtn.addEventListener('click', () => {
    console.log(`running? ${running}`);
    wsTimer.send(timeRemaining);
    if (!running) {
        timerInterval = setInterval(countDown, 1000);
        running = true;
    }
})