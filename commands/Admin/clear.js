const fs = require('fs')

const competition = require('../../competition.json')

module.exports = {
    name: 'clear',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        competition.length = 0
        
        fs.writeFile('./competition.json', JSON.stringify(competition), err => {
            if (err) console.error(err);
        });

        message.channel.send('List cleared.')
    }
}