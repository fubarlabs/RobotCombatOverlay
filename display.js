window.addEventListener('DOMContentLoaded()', () => {
    const ws = new WebSocket('ws://localhost:8001/')

    ws.onmessage = (event) => {
        console.log(event);
    }
})