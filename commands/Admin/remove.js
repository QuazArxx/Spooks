const fs = require('fs')
const Discord = require('discord.js')

const colors = require('../../colors.json')
const competition = require('../../competition.json')
module.exports = {
    name: 'remove',
    description: 'Removes a player from the competition list.',
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        if (!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > competition.length) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle(`Please pick a number 1-${competition.length} that corresponds to the player you want to remove using !list.`)
    
            return message.channel.send({embeds: [embed]})
        }

        const embed = new Discord.MessageEmbed()
        .setColor(colors.green)
        .setTitle(`${competition[args[0]-1].name} was removed successfully!`)

        message.channel.send({embeds: [embed]})
        
        await competition.splice(args[0] - 1, 1)

        fs.writeFile('./competition.json', JSON.stringify(competition), err => {
            if (err) console.error(err);
        });
    }
}