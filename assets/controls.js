const ws = new WebSocket('ws://127.0.0.1:1880/receive');
const wsTimer = new WebSocket('Ws://127.0.0.1:1880/receiveTimer');

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

resetBtn.addEventListener('click', () => {
    wsTimer.send('reset');
})
pauseBtn.addEventListener('click', () => {
    wsTimer.send('pause');
})
startBtn.addEventListener('click', () => {
    wsTimer.send('start');
})