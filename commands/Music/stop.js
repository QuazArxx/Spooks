const Discord = require('discord.js')

const { queue } = require('../../functions')
const colors = require('../../colors.json')
module.exports = {
    name: 'stop',
    description: 'Stops and empties the queue',
    execute(message, args) {
        stopSong(message, queue.get(message.guild.id))
    }
}

const stopSong = async (message, serverQueue) => {
    if (!serverQueue) {
        const embed = new Discord.MessageEmbed()
        .setColor(colors.red)
        .setTitle('There are no songs in the queue!')

        return message.channel.send({ embeds: [embed] })
    }

    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()

    const embed = new Discord.MessageEmbed()
    .setColor(colors.yellow)
    .setTitle('Playing stopped. Use !play to queue more songs.')

    await message.channel.send({ embeds: [embed] })
}