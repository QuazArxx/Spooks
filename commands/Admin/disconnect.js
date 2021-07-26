const Discord = require('discord.js')

const colors = require('../../colors.json')
const { queue } = require('../../functions')
module.exports = {
    name: 'disconnect',
    description: 'forces the bot to leave the voice channel',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        const connection = message.member.voice.channel
        serverQueue = queue.get(message.guild.id)

        serverQueue.songs = []
        if (!serverQueue.connection.dispatcher == null) {
            serverQueue.connection.dispatcher.end()
        }
        connection.leave()
    }
}