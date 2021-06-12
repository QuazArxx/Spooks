const Discord = require('discord.js')

const functions = require('../../functions')

module.exports = {
    name: 'end',
    description: 'Ends the current competition',
    permissions: 'ADMINISTRATOR',
    aliases: 'stop',
    execute(message, args) {
        if (functions.isThereCompetition == true) {
            functions.isThereCompetition = false

            const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('The current competition has been ended.')

            return message.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('There is no competition currently.')

            return message.channel.send(embed)
        }
    }
}