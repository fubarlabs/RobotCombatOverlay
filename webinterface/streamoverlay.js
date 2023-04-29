import url from "./config.js";

const weightClasses = {
    'ant': 'Antweight',
    'plant': 'Plastic Antweight',
    'beetle': 'Beetleweight'
};

const redBotDisplay = document.getElementById('redBotName');
const blueBotDisplay = document.getElementById('blueBotName');
const weightClassDisplay = document.getElementById('weightClass');
const matchNameDisplay = document.getElementById('matchName');

const options = {
    clean: true,
    connectTimeout: 4000
}

const client = mqtt.connect(url, options);
console.log('about to connect');

client.on('connect', () => {
    console.log('connected');
    client.subscribe('matchinfo');
})

client.on('message', (topic, msg) => {

    const matchInfo = JSON.parse(msg.toString());
    console.log(matchInfo);
    redBotDisplay.innerText = matchInfo.red;
    blueBotDisplay.innerText = matchInfo.blue;

    weightClassDisplay.innerText = weightClasses[matchInfo.weight];

    matchNameDisplay.innerHTML = matchInfo.match;
    // console.log(matchInfo.match.length);

})