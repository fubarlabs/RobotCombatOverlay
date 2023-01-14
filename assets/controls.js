const ws = new WebSocket('ws://127.0.0.1:1880/receive');

ws.onopen = (event) => {
    console.log(`Connected to ${event.target.url} succesfully`);
}

const weightClassSelector = document.getElementById('weight-class-select');
const redBotSelector = document.getElementById('red-select');
const blueBotSelector = document.getElementById('blue-select');
const matchSelector = document.getElementById('match-select');
const updateBtn = document.getElementById('update-btn');

updateBtn.addEventListener('click', () => {
    let weightClass = weightClassSelector.value;
    let redBot = redBotSelector.value;
    let blueBot = blueBotSelector.value;
    let match = matchSelector.value;

    console.log(`${redBot} (red) is fighting ${blueBot} (blue) in the ${weightClass} class in ${match}`);
    message = `${redBot};${blueBot};${weightClass};${match}`;
    ws.send(message);
})