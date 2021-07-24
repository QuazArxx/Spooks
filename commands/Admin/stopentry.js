const Discord = require('discord.js')

const functions = require('../../functions')

module.exports = {
    name: 'stopentry',
    description: 'stops further entrants to the competition',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        if (functions.areEntriesAllowed == true) {
            functions.areEntriesAllowed = false

            const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('No more entries will be allowed.')

            return message.channel.send(embed)
        } else if (functions.isThereCompetition == false) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('There is no current competition happening.')
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Entries have already been stopped.')

            return message.channel.send(embed)
        }
    }
}