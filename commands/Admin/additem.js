const fs = require('fs')
const Discord = require('discord.js')

const { prefix } = require('../../config.json')
const equipment = require('../../equipment.json')

module.exports = {
    name: 'additem',
    description: 'Adds an item to the equipment list',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        args = message.content.slice(prefix.length).split(' ');

        if (!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('You need to enter in the name of the item to add.')

            return message.channel.send(embed)
        }

        let short;
        if (!args[2]) short = 'none'
        else short = args[2]

        equipment.push({
            lowercase: args[1].toLowerCase(),
            capitalize: args[1],
            shortcut: short
        })

        fs.writeFile('./equipment.json', JSON.stringify(equipment), err => {
            if (err) console.error(err);
        });

        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Item added successfully!')

        message.channel.send(embed)
    }
}