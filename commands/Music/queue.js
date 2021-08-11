const Discord = require('discord.js')

const colors = require('../../colors.json')
module.exports = {
    name: 'queue',
    description: 'Queues music to play from Spooks',
    aliases: 'q',
    execute(client, message, args) {
        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You can\'t queue up nothing!')

            return message.channel.send({ embeds: [embed] })
        }
    }
}