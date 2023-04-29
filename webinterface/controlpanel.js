import robots from "../robotdata.js";
import url from "./config.js";

const ants = robots.ant;
const plants = robots.plant;
const beetles = robots.beetle;

function createOption(botName) {
    console.log(`generating an option from ${botName}`);
    let option = document.createElement('option');
    option.value = botName;
    option.innerText = botName;
    return option;
}

function setOptions(botList, dropdownTarget) {
    console.log(`Adding ${botList} to ${dropdownTarget}`);
    dropdownTarget.innerText = '';
    botList.forEach(bot => {
        dropdownTarget.appendChild(createOption(bot));
    });
}


const options = {
    clean: true,
    connectTimeout: 4000
}

console.log(`About to connect to ${url}`);
const client = mqtt.connect(url, options);
client.on('connect', () => {
    console.log('connected');
    client.subscribe('test', (err) => {
        if (!err) {
            client.publish('test', 'hello mqtt')
        }
    })
})

// Time control section, using 'timecontrol' topic to send messages to arena
const resetButton = document.getElementById('timerResetButton');
const timerIncrement = document.getElementById('timerIncrement');
const timerIncrementButton = document.getElementById('timerIncrementButton');

resetButton.addEventListener('click', (event) => {
    client.publish('timecontrol', 'r');
})
timerIncrementButton.addEventListener('click', (event) => {
    let seconds = timerIncrement.value;
    client.publish('timecontrol', `a${seconds}`)
})

// Weight classes and robot names control section
const antButton = document.getElementById('antButton');
const plantButton = document.getElementById('plantButton');
const beetleButton = document.getElementById('beetleButton');
const redSelect = document.getElementById('redSelect');
const blueSelect = document.getElementById('blueSelect');
const matchNameInput = document.getElementById('matchName');
const updateMatch = document.getElementById('updateMatch');
let activeWeightClass = 'ant';

// set it to start with a weight class, mostly because testing was getting annoying
setOptions(ants, redSelect);
setOptions(ants, blueSelect);

antButton.addEventListener('click', (event) => {
    activeWeightClass = 'ant';
    setOptions(ants, redSelect);
    setOptions(ants, blueSelect);
})
plantButton.addEventListener('click', (event) => {
    activeWeightClass = 'plant';
    setOptions(plants, redSelect);
    setOptions(plants, blueSelect);
})
beetleButton.addEventListener('click', (event) => {
    activeWeightClass = 'beetle';
    setOptions(beetles, redSelect);
    setOptions(beetles, blueSelect);
})

updateMatch.addEventListener('click', (event) => {
    let redBot = redSelect.value;
    let blueBot = blueSelect.value;
    let matchName = matchNameInput.value;
    let message = JSON.stringify({weight: activeWeightClass, red: redBot, blue: blueBot, match: matchName})
    console.log(message);
    client.publish('matchinfo', message);
})