const Discord = require('discord.js')

const colors = require('../../colors.json')
const { queue } = require('../../functions')
module.exports = {
    name: 'disconnect',
    description: 'forces the bot to leave the voice channel',
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        const connection = message.member.voice.channel
        serverQueue = queue.get(message.guild.id)

        serverQueue.songs = []
        if (!serverQueue.connection.dispatcher == null) {
            serverQueue.connection.dispatcher.end()
        }
        connection.leave()

        const embed = new Discord.MessageEmbed()
        .setColor(colors.green)
        .setTitle('Bot successfully left the voice channel.')
        
        await message.channel.send(embed)
    }
}