const fs = require('fs')
const Discord = require('discord.js')

const colors = require('../../colors.json')
const competition = require('../../competition.json')
const playersPicked = require('../../PlayersPicked.json')
const functions = require('../../functions')
module.exports = {
    name: 'addcomp',
    description: 'Adds new competitor as sub',
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        if (functions.isThereCompetition == false) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no current competition going on.')

            return message.channel.send({ embeds: [embed] })
        }
        // Add competitor role
        competition.push({
            name: message.mentions.users.first().username,
            id: message.author.id,
            isCaptain: false,
            object: message.member
        })

        message.guild.members.cache.get(message.mentions.users.first().id).roles.add('877613773345681478')
        // Add Team Role
        // Add to playersPicked

        fs.writeFile('./PlayersPicked.json', JSON.stringify(playersPicked), err => {
            if (err) console.error(err);
        });
    }
}