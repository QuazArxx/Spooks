const fs = require('fs')
const Discord = require('discord.js')

const functions = require('../../functions')
const competition = require('../../competition.json')

module.exports = {
    name: 'start',
    description: 'Starts competition times.',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        if(functions.isThereCompetition == false) {
            functions.isThereCompetition = true
            functions.areEntriesAllowed = true
            competition.length = 0

            // TODO remove setting competition array to 0
            fs.writeFile('./competition.json', JSON.stringify(competition), err => {
                if (err) console.error(err);
            });

            const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('A competition has been started!')
    
            return message.channel.send({ embeds: [embed] })
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('There is already a competition in progress.')

            return message.channel.send({ embeds: [embed] })
        }
    }
}