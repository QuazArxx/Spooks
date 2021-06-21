const fs = require('fs')
const Discord = require('discord.js')

const competition = require('../../competition.json')
const functions = require('../../functions')

module.exports = {
    name: 'enter',
    execute(message, args) {
        if (functions.isThereCompetition == false || functions.areEntriesAllowed == false) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Either there is no competition or entries have been closed.')

            return message.channel.send(embed)
        }

        competition.push({
            name: message.author.username,
            id: message.author.id,
            object: message.member
        })

        message.member.roles.add('853046476309528607')

        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('You have entered the competition! Good luck!')

        fs.writeFile('./competition.json', JSON.stringify(competition), err => {
            if (err) console.error(err);
        });

        message.channel.send(embed)
    }
}