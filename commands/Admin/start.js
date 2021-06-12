const Discord = require('discord.js')

const { isThereCompetition } = require('../../functions')
const competition = require('../../competition.json')

module.exports = {
    name: 'start',
    description: 'Starts competition times.',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        if(isThereCompetition == false) {
            isThereCompetition = true
            competition.length = 0

            const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('A competition has been started!')
    
            return message.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('There is already a competition in progress.')

            return message.channel.send(embed)
        }
    }
}