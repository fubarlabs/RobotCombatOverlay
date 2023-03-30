document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://localhost:8001')
    const userCount = document.getElementById('usersCount');

    ws.onmessage = ({ data }) => {
        // variable name is data because we're destructuring the data key from the message.
        const event = JSON.parse(data);
        switch (event.type) {
            case 'users':
                console.log(`A user connected or disconnected. There are currently ${event.count} users.`);
                break;
            default:
                console.log(`I'm not sure what to do with ${event.type}`);
        }
    }
})