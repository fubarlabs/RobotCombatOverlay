const ws = new WebSocket('ws://127.0.0.1:1880/publish')
const redText = document.getElementById('red-text');
const blueText = document.getElementById('blue-text');
const weightClassText = document.getElementById('weight-class-text');

ws.onopen = (event) => {
    console.log(`Connected to ${event.target.url} succesfully`);
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
        'weightClass': response[2]
    };

    // assign text to HTML elements
    redText.innerText = overlayInfo['red'];
    blueText.innerText = overlayInfo['blue'];
    weightClassText.innerText = overlayInfo['weightClass'];
}