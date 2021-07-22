const Discord = require('discord.js')

const colors = require('../../colors.json')
module.exports = {
    name: 'join',
    description: 'Allows Spooks to join a voice channel',
    async execute(message, args) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join()
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You\'re not in a voice channel!')

            return message.channel.send(embed)
        }
    }
}