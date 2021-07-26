const Discord = require('discord.js')

const colors = require('../../colors.json')

module.exports = {
    name: 'disconnect',
    description: 'forces the bot to leave the voice channel',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        const connection = message.member.voice.channel

        connection.leave()
    }
}