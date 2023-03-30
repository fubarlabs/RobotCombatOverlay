const robots = {
    ' ': [' '],
    'Antweight': ['Antweight 1', 'Antweight 2', 'Antweight 3'],
    'Plastic Antweight': ['Plastic Ant 1', 'Plastic Ant 2', 'Plastic Ant 3'],
    'Beetleweight': ['Beetleweight 1', 'Beetleweight 2', 'Beetleweight 3']
}

function setupWeightClasses(botInfo, htmlElement) {
    Object.keys(botInfo).forEach( weightClass => {
        let option = document.createElement('option');
        option.value = weightClass;
        option.innerText = weightClass;
        htmlElement.appendChild(option);
    })
}

function changeBotOptions(weight, botInfo, htmlElement) {
    console.log('time to make changes');
    htmlElement.innerText = '';
    const bots = botInfo[weight];
    bots.forEach(bot => {
        console.log(bot);
        let option = document.createElement('option');
        option.value = bot;
        option.innerText = bot;
        htmlElement.appendChild(option);
    })

}

document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://localhost:8001');
    const userCount = document.getElementById('usersCount');
    const weightSelect = document.getElementById('weightClass');
    const redBot = document.getElementById('redBot');
    const blueBot = document.getElementById('blueBot')
    const updateBtn = document.getElementById('update');
    
    setupWeightClasses(robots, weightSelect);
    weightSelect.addEventListener('change', () => {
        changeBotOptions(weightSelect.value, robots, redBot);
        changeBotOptions(weightSelect.value, robots, blueBot);
    });

    updateBtn.addEventListener('click', () => {
        ws.send(JSON.stringify({
            type: 'match',
            value: {
                weightClass: weightSelect.value,
                redBot: redBot.value,
                blueBot: blueBot.value
            }
        }));
    });

    ws.onmessage = ({ data }) => {
        // variable name is data because we're destructuring the data key. probably. javascript is weird.
        const event = JSON.parse(data);
        switch(event.type) {
            case 'users':
                console.log(`A user connected or disconnected. There are currently ${event.count} users.`);
                userCount.innerText = event.count;
                break;
            default:
                console.log(`I'm not sure what to do with ${event.type} events.`);
        }
    }
})



