const fs = require('fs')
const Discord = require('discord.js')

const colors = require('../../colors.json')
const teams = require('../../teams.json')
const competition = require('../../competition.json')
const playersPicked = require('../../PlayersPicked.json')
module.exports = {
    name: 'random',
    description: 'Picks random teams',
    permissions: 'ADMINISTRATOR',
    category: 'competition',
    async execute(client, message, args) {
        if (!functions.isThereCompetition) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no current competition!')

            return message.channel.send({ embeds: [embed] })
        }

        playersPicked.length = 0
        for (let x = 0; x < teams.length; x++) {
            teams[x].team.length = 0
        }

        let playerId
        let teamRoleId
        let randomPlayer
        let randomTeam
        for (let x = 0; x < competition.length; x++) {
            do {
                randomPlayer = Math.floor(Math.random() * competition.length)
                playerId = competition[randomPlayer].id
            } while (playersPicked.some(user => user.userId == playerId) || competition[randomPlayer].isCaptain == true)
        
            do {
                randomTeam = Math.floor(Math.random() * teams.length)
                teamRoleId = teams[randomTeam].roleId
            } while (teams[randomTeam].team.length > 2)

            playersPicked.push({
                userId: playerId,
                roleId: teamRoleId
            })

            teams[randomTeam].team.push(competition[randomPlayer].object.displayName)
        }

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

            message.guild.channels.get('841391519775719445').send({ embeds: [embed] })
        }

        const embed = new Discord.MessageEmbed()
        .setColor(colors.green)
        .setTitle('Teams have been randomly selected! Type !start to begin the competition or do !random again for new random teams.')

        message.channel.send({ embeds: [embed] })
    }
}