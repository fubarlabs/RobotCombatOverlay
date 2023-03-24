const socket = new WebSocket('ws://localhost:8001');

socket.addEventListener('open', (event) => {
    console.log('Connected to ${event.target.url}');
    socket.send('Hello from a display');
})