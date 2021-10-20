const fs = require('fs')
const Discord = require('discord.js')

const colors = require('../../colors.json')
const competition = require('../../competition.json')
const playersPicked = require('../../PlayersPicked.json')
const functions = require('../../functions')
module.exports = {
    name: 'addcomp',
    description: 'Adds new competitor as sub',
    permissions: 'ADMINISTRATOR',
    category: 'competition',
    async execute(client, message, args) {
        if (functions.isThereCompetition == false) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no current competition going on.')

            return message.channel.send({ embeds: [embed] })
        } else if (!message.mentions.users.size) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You forgot to mention someone.')

            return message.channel.send({ embeds: [embed] })
        }

        competition.push({
            name: message.mentions.users.first().username,
            id: message.mentions.users.first().id,
            isCaptain: false,
            object: message.member
        })

        playersPicked.push({
            userId: message.mentions.users.first().id,
            roleId: this.getRoleFromMention(args[1])
        })

        await message.guild.members.cache.get(message.mentions.users.first().id).roles.add('877613773345681478')
        await message.guild.members.cache.get(message.mentions.users.first().id).roles.add(this.getRoleFromMention(args[1]))

        fs.writeFile('./PlayersPicked.json', JSON.stringify(playersPicked), err => {
            if (err) console.error(err);
        });

        const embed = new Discord.MessageEmbed()
        .setColor(colors.green)
        .setTitle(`${message.mentions.users.first().username} was successfully added to the competition.`)

        message.channel.send({ embeds: [embed] })
    },
    
    getRoleFromMention: function (mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@&') && mention.endsWith('>')) {
            mention = mention.slice(3, -1);
    
            return mention;
        }
    }
}