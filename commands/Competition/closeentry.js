const Discord = require('discord.js')

const functions = require('../../functions')
const colors = require('../../colors.json')

module.exports = {
    name: 'closeentry',
    description: 'stops further entrants to the competition',
    permissions: 'ADMINISTRATOR',
    category: 'competition',
    execute(client, message, args) {
        if (functions.areEntriesAllowed == true) {
            functions.areEntriesAllowed = false

            const embed = new Discord.MessageEmbed()
            .setColor(colors.green)
            .setTitle('No more entries will be allowed.')

            return message.channel.send({ embeds: [embed] })
        } else if (functions.isThereCompetition == false) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no current competition happening.')
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('Entries have already been stopped.')

            return message.channel.send({ embeds: [embed] })
        }
    }
}