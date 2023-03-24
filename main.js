const socket = new WebSocket('ws://localhost:8001');
const textInput = document.getElementById('textInput');
const btn = document.getElementById('sendBtn');

socket.addEventListener('open', (event) => {
    console.log(`Connected to ${event.target.url}`);
    socket.send('Hello from a control panel');
})

btn.addEventListener('click', (event) => {
    let msg = textInput.value;
    socket.send(msg);
})