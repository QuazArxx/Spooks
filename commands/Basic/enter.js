const fs = require('fs')
const Discord = require('discord.js')

const competition = require('../../competition.json')
const functions = require('../../functions')
const colors = require('../../colors.json')

module.exports = {
    name: 'enter',
    execute(message, args) {
        if (functions.isThereCompetition == false || functions.areEntriesAllowed == false) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('Either there is no competition or entries have been closed.')

            return message.channel.send({ embeds: [embed] })
        }else if (competition.some(user => user.id == message.author.id)) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You have already joined the competition. If you would like to leave, type "!leave"')

            return message.channel.send({ embeds: [embed] })
        }

        competition.push({
            name: message.author.username,
            id: message.author.id,
            isCaptain: false,
            object: message.member
        })

        message.member.roles.add('775547730901729330')

        const embed = new Discord.MessageEmbed()
        .setColor(colors.green)
        .setTitle('You have entered the competition! Good luck!')

        fs.writeFile('./competition.json', JSON.stringify(competition), err => {
            if (err) console.error(err);
        });

        message.channel.send({ embeds: [embed] })
    }
}