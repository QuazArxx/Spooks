const Discord = require('discord.js')

const colors = require('../../colors.json')
const teams = require('../../teams.json')
const playersPicked = require('../../PlayersPicked.json')
const functions = require('../../functions')
module.exports = {
    name: 'start',
    description: 'Adds team roles and posts teams to start the competition.',
    permissions: 'ADMINISTRATOR',
    category: 'competition',
    async execute(client, message, args) {
        if (functions.isThereCompetition == false) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no competition going on right now.')

            return message.channel.send({ embeds: [embed] })
        } else if (functions.isThereCompetition == true && functions.areEntriesAllowed == true) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You must stop entries before starting the competition.')

            return message.channel.send({ embeds: [embed] })
        }

        for (let x = 0; x < playersPicked.length; x++) {
            message.guild.members.cache.get(playersPicked[x].userId).roles.add(playersPicked[x].roleId)
        }

        // ADD @EVERYONE BEFORE SENDING TEAMS
        await message.guild.channels.get('849701097106440203').send('@everyone')

        for (let x = 0; x < teams.length; x++) {
            let players = []

            for (let y = 0; y < teams[x].team.length; y++) {
                players.push(teams[x].team[y])
            }

            const embed = new Discord.MessageEmbed()
            .setColor(colors.black)
            .setTitle(`__${teams[x].captainName}\'s Team:__`)
            .addFields(
                {name: players[0], value: '\u200B'},
                {name: players[1], value: '\u200B'},
                {name: players[2], value: '\u200B'}
            )

            await message.guild.channels.get('849701097106440203').send({ embeds: [embed] })
        }
    }
}