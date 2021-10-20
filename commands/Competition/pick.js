const fs = require('fs')
const Discord = require('discord.js')

const colors = require('../../colors.json')
const competition = require('../../competition.json')
const teams = require('../../teams.json')
const functions = require('../../functions')
const playersPicked = require('../../PlayersPicked.json')
module.exports = {
    name: 'pick',
    description: 'Lets captains pick team members',
    category: 'competition',
    async execute(client, message, args) {
        if (!functions.isThereCompetition) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no current competition!')

            return message.channel.send({ embeds: [embed] })
        } else if (!(teams.some(user => user.captainId == message.author.id))) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You don\'t have permission to use this command!')

            return message.channel.send({ embeds: [embed] })
        } else if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You need to pick a player to add to your team!')

            return message.channel.send({ embeds: [embed] })
        } else if (playersPicked.some(user => user.userId == competition[args[0]-1].id)) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('That player was already picked!')

            return message.channel.send({ embeds: [embed]})
        }

        const player = competition[args[0]-1].object

        const captainRoleId = ''
        // Push chosen player to author's team array
        for (let x = 0; x < teams.length; x++) {
            if (teams[x].captainId == message.author.id) {
                teams[x].team.push(player.displayName)
                captainRoleId = teams[x].roleId
                break
            }
        }

        // Add them to player picked array
        playersPicked.push({
            userId: player.id,
            roleId: captainRoleId,
            playerName: player.displayName
        })

        fs.writeFile('./competition.json', JSON.stringify(competition), err => {
            if (err) console.error(err);
        });

        fs.writeFile('./PlayersPicked.json', JSON.stringify(playersPicked), err => {
            if (err) console.error(err);
        });

        const embed = new Discord.MessageEmbed()
        .setColor(colors.green)
        .setTitle(`${message.author.displayName} picked ${player.displayName} for their team.`)

        await message.channel.send({ embeds: [embed] })
    }
}