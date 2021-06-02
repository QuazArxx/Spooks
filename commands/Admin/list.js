const Discord = require('discord.js')

const competition = require('../../competition.json')

module.exports = {
    name: 'list',
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        if (competition.length == 0) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('List is empty.')

            return message.channel.send(embed)
        }

        const embed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('__Phasmo Competitors:__')
        .addField(competition.join(', '), '\u200B')

        await message.channel.send(embed)
    }
}