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
    async execute(message, args) {
        if (!functions.isThereCompetition) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no current competition!')

            return message.channel.send({ embeds: [embed] })
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

        const embed = new Discord.MessageEmbed()
        .setColor(colors.green)
        .setTitle('Teams have been randomly selected! Type !start to begin the competition.')

        message.channel.send({ embeds: [embed] })
    }
}