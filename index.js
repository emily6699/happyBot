const Slackbot = require('slackbots');
const axios = require('axios');

const bot = new Slackbot({
    token: 'xoxp-619971975700-609052688323-622661955975-f79567d7b4e55d7da990056900bec9e1',
    name: 'happyBot'
});

//Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel('general', 'Hello! Get Ready to Laugh With @happyBot!',
        params
    );
});

// Erro Handler
bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

//Respons to Data
const handleMessage = (message) => {
    if (message.includes(' tell me a joke')) {
        chunckJoke();
    } else if (message.includes(' yomama')) {
        yoMamaJoke();

    } else if (message.includes(' random')) {
        randomJoke();
    } else if (message.includes(' cat')) {
        catPic();
    }
    else if (message.includes(' dog')) {
        dogPic();
    } else if (message.includes(' help')) {
        runHelp();
    }
}

//Tell a Chunk Norris Joke
const chunckJoke = () => {
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':laughing:'
            }

            bot.postMessageToChannel('general', `Chunk Norris: ${joke}`,
                params
            );
        })
}
// Tell a yoMama joke
const yoMamaJoke = () => {
    axios.get('https://api.yomomma.info/')
        .then(res => {
            const joke = res.data.joke;

            const params = {
                icon_emoji: ':smirk:'
            }

            bot.postMessageToChannel('general', `Yo Mama: ${joke}`,
                params
            );
        })
}

const catPic = () => {
    axios.get('https://aws.random.cat/meow')
        .then(res => {
            const catPicture = res.data.file;

            const params = {
                icon_emoji: ':cat:'
            }
            bot.postMessageToChannel('general', catPicture, params)
        })
}

const dogPic = () => {
    axios.get('https://random.dog/woof.json')
        .then(res => {
            const dogPicture = res.data.url;

            const params = {
                icon_emoji: ':dog:'
            }
            bot.postMessageToChannel('general', dogPicture, params)
        })
}



//Tell a random joke
const randomJoke = () => {
    const rand = Math.floor(Math.random() * 2) + 1;
    if (rand === 1) {
        chunckJoke();
    } else if (rand === 2) {
        yoMamaJoke();
    }
}

// Show Help Text

const runHelp = () => {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel('general', `Type @happyBot with either 'tell me a joke', 'yomama', or 'random' to get a joke. Type with 'cat' or 'dog' to get a cat or dog picture`,
        params
    );
}