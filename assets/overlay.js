const ws = new WebSocket('ws://127.0.0.1:1880/publish');
const wsTimer = new WebSocket('ws://127.0.0.1:1880/publishTimer');

const redText = document.getElementById('red-text');
const blueText = document.getElementById('blue-text');
const weightClassText = document.getElementById('weight-class-text');
const matchText = document.getElementById('match-type-text');
const timerText = document.getElementById('timer-text');

ws.onopen = (event) => {
    console.log(`Connected to ${event.target.url} succesfully`);
}

wsTimer.onopen = (event) => {
    console.log(`Connected to ${event.target.url} successfully`);
}

ws.onmessage = (msg) => {
    
    // Show response
    console.log(msg.data);

    // Split response into components
    response = msg.data.split(";");
    
    // this step isn't really necessary, just putting it here to be easier to keep track of what's happening
    overlayInfo = {
        'red': response[0],
        'blue': response[1],
        'weightClass': response[2],
        'match': response[3]
    };

    // assign text to HTML elements
    redText.innerText = overlayInfo['red'];
    blueText.innerText = overlayInfo['blue'];
    weightClassText.innerText = overlayInfo['weightClass'];
    matchText.innerText = overlayInfo['match'];
}

wsTimer.onmessage = (msg) => {
    timerText.innerText = msg.data;
}