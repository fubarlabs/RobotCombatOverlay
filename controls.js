document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://localhost:8001');

    ws.onmessage = ({ data }) => {
        // variable name is data because we're destructuring the data key from the message.
        const event = JSON.parse(data);
        console.log(event);
    }
   
})