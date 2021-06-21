const fs = require('fs')
const Discord = require('discord.js')

const competition = require('../../competition.json')
const functions = require('../../functions')

module.exports = {
    name: 'leave',
    description: 'Lets users leave the competition grouping.',
    execute(message, args) {
        if (functions.isThereCompetition == false || !(competition.some(user => user.id == message.author.id))) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Either there is no competition to leave, or you haven\'t entered yet.')

            return message.channel.send(embed)
        }

        for (let x = 0; x < competition.length; x++) {
            if (competition[x].id == message.author.id) {
                competition.splice(x, 1)
                message.member.roles.remove('853046476309528607')

                fs.writeFile('./competition.json', JSON.stringify(competition), err => {
                    if (err) console.error(err);
                });

                const embed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('You have left the competition queue.')

                return message.channel.send(embed)
            }
        }
    }
}