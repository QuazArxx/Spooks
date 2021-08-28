const fs = require('fs')
const Discord = require('discord.js')

const colors = require('../../colors.json')
const competition = require('../../competition.json')
const teams = require('../../teams.json')
const functions = require('../../functions')

module.exports = {
    name: 'pick',
    description: 'Lets captains pick team members',
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        if (!functions.isThereCompetition) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no current competition!')

            return message.channel.send({ embeds: [embed] })
        } else if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You need to pick a player to add to your team!')

            return message.channel.send({ embeds: [embed] })
        }
        // Remove player from list
            // Change bool variable to true
        // Push chosen player to author's team array
    }
}