const socket = new WebSocket('ws://localhost:8001');
const button = document.getElementById('btn');

socket.addEventListener('open', (event) => {
    console.log(`Connected to ${event.target.url}`);
})

button.addEventListener('click', (event) => {
    console.log(event);
    let message = {'x': event.clientX, 'y': event.clientY};
    socket.send(JSON.stringify(message));
})