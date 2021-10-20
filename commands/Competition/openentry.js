const Discord = require('discord.js')

const functions = require('../../functions')
const colors = require('../../colors.json')

module.exports = {
    name: 'openentry',
    description: 'Starts competition times.',
    permissions: 'ADMINISTRATOR',
    category: 'competition',
    execute(client, message, args) {
        if(functions.isThereCompetition == false) {
            functions.isThereCompetition = true
            functions.areEntriesAllowed = true

            const embed = new Discord.MessageEmbed()
            .setColor(colors.green)
            .setTitle('A competition has been started! Players may now enter the competition.')
    
            return message.channel.send({ embeds: [embed] })
        } else if (functions.isThereCompetition == true && functions.areEntriesAllowed == false) {
            functions.areEntriesAllowed = true

            const embed = new Discord.MessageEmbed()
            .setColor(colors.green)
            .setTitle('Entries have been reopened.')

            return message.channel.send({ embeds: [embed] })
        } else if (functions.isThereCompetition == true && functions.areEntriesAllowed == true) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('Entries are already open.')

            message.channel.send({ embeds: [embed] })
        }
    }
}