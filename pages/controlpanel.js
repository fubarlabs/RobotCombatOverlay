const url = 'ws://192.168.1.138:9001'

const options = {
    clean: true,
    connectTimeout: 4000
}

const client = mqtt.connect(url, options);
client.on('connect', () => {
    console.log('connected');
    client.subscribe('test', (err) => {
        if (!err) {
            client.publish('test', 'hello mqtt')
        }
    })
})

const button = document.getElementById('timerResetButton');
button.addEventListener('click', (event) => {
    client.publish('test', 'clicked a button');
})