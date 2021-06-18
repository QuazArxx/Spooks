const fs = require('fs')
const Discord = require('discord.js')

const competition = require('../../competition.json')
const functions = require('../../functions')

module.exports = {
    name: 'leave',
    description: 'Lets users leave the competition grouping.',
    execute(message, args) {
        if (functions.isThereCompetition == false || !(competition.some(user => user.username == message.author.username))) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Either there is no competition to leave, or you haven\'t entered yet.')

            return message.channel.send(embed)
        }

        
    }
}