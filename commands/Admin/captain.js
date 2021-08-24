// NEEDS TO BE FINISHED
const fs = require('fs')
const Discord = require('discord.js')

const colors = require('../../colors.json')
const competition = require('../../competition.json')
module.exports = {
    name: 'captain',
    Description: 'Adds the captain role to captains',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        if (!message.mentions.users.size) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You forgot to mention someone to make a captain!')

            return message.channel.send({ embeds: [embed] })
        } else if (!(competition.some(user => user.id == message.mentions.users.first().id))) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('That person is not in the competition yet!')

            return message.channel.send({ embeds: [embed] })
        }

        for (let x = 0; x < competition.length; x++) {
            if (competition[x].id == message.mentions.users.first().id) {
                competition[x].isCaptain = true;
                // add captain role to mentioned user

                const embed = new Discord.MessageEmbed()
                .setColor(colors.green)
                .setTitle(`${competition[x].object.displayName} was made a captain!`)

                return message.channel.send({ embeds: [embed] })
            }
        }
    }
}