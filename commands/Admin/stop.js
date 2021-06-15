const Discord = require('discord.js')

const functions = require('../../functions')

module.exports = {
    name: 'stop',
    description: 'Ends the current competition',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        if (functions.areEntriesAllowed == true) {
            functions.areEntriesAllowed = false

            const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('No more entries will be allowed.')

            return message.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('There is no competition currently.')

            return message.channel.send(embed)
        }
    }
}