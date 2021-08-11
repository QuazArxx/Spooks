const Discord = require('discord.js')

const competition = require('../../competition.json')
const functions = require('../../functions')
const { prefix } = require('../../config.json')

let used = false

module.exports = {
    name: 'pick',
    description: 'Lets captains pick team members',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        if (functions.isThereCompetition == false || functions.areEntriesAllowed == true) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('There is no current competition or you haven\'t stopped new entries.')

            return message.channel.send({ embeds: [embed] })
        }

        args = message.content.slice(prefix.length).split(' ');

        if (!args[1]) {
            if (used) return
            else {
                used = true
                
                const embed = new Discord.MessageEmbed()
                .setColor('#000000')
                .setTitle(`__Players in Competition__ - Type "${prefix}pick #" to add a player to your team`)
                .addFields(
                    {name: `1. ${competition[0].name}`, value: '\u200B'}
                )
                
                return message.channel.send({ embeds: [embed] })
            }
        }
    }
}