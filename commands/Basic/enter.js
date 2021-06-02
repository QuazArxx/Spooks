const fs = require('fs')
const Discord = require('discord.js')

const competition = require('../../competition.json')

module.exports = {
    name: 'enter',
    execute(message, args) {
        if (competition.includes(message.author.username)) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('You already entered the competition.')

            return message.channel.send(embed)
        } else {
            competition.push(message.author.username)

            const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('You have entered the competition! Good luck!')

            fs.writeFile('./competition.json', JSON.stringify(competition), err => {
                if (err) console.error(err);
            });

            return message.channel.send(embed)
        }
    }
}