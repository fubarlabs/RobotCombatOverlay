document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://localhost:8001');
    const btn = document.getElementById('clicky');
    
    btn.addEventListener('click', (event) => {
        const txtValue = document.getElementById('botName').value;
        console.log(txtValue);
        ws.send(JSON.stringify({type: 'update', value: txtValue}));
    });

    ws.onmessage = ({ data }) => {
        const event = JSON.parse(data);
        console.log(`Message received: ${event.value}`);
    }
})