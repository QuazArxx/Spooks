const fs = require('fs')
const Discord = require('discord.js')

const { prefix } = require('../../config.json')
const ghosts = require('../../ghosts.json')

module.exports = {
    name: 'addghost',
    description: 'Adds an item to the ghosts list',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        args = message.content.slice(prefix.length).split(' ');

        if (!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('You need to enter in the name of the ghost to add.')

            return message.channel.send({ embeds: [embed] })
        }

        let short;
        if (!args[2]) short = 'none'
        else short = args[2]

        ghosts.push({
            lowercase: args[1].toLowerCase(),
            capitalize: args[1],
            shortcut: short
        })

        fs.writeFile('./ghosts.json', JSON.stringify(ghosts), err => {
            if (err) console.error(err);
        });

        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Ghost added successfully!')

        message.channel.send({ embeds: [embed] })
    }
}