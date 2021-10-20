// NEEDS TO BE FINISHED
const fs = require('fs')
const Discord = require('discord.js')

const colors = require('../../colors.json')
const competition = require('../../competition.json')
const teams = require('../../teams.json')
module.exports = {
    name: 'captain',
    Description: 'Adds the captain role to captains',
    permissions: 'ADMINISTRATOR',
    category: 'competition',
    async execute(client, message, args) {
        if (!message.mentions.users.size) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You forgot to mention someone to make a captain!')

            return message.channel.send({ embeds: [embed] })
        } else if (!(competition.some(user => user.id == message.mentions.users.first().id))) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('That person is not in the competition yet!')

            return message.channel.send({ embeds: [embed] })
        }
        
        target = message.mentions.users.first()

        if (!(teams.some(user => user.captainId == target.id)) && !args[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('You forgot to mention their team role!')

            return message.channel.send({ embeds: [embed] })
        } else if (!(teams.some(user => user.captainId == target.id)) && args[1]) {
            const targetDisplayName = ''

            for (let x = 0; x < competition.length; x++) {
                if (competition[x].id == target.id) {
                    targetDisplayName = competition[x].object.displayName
                }
            }

            teams.push({
                captainName: targetDisplayName,
                captainId: target.id,
                roleId: this.getRoleFromMention(args[1]),
                team: []
            })
        }

        fs.writeFile('./teams.json', JSON.stringify(teams), err => {
            if (err) console.error(err);
        });

        for (let x = 0; x < competition.length; x++) {
            if (competition[x].id == message.mentions.users.first().id) {
                competition[x].isCaptain = true;
                // add captain role to mentioned user
                await message.guild.members.cache.get(message.mentions.users.first().id).roles.add('877613773345681478')


                const embed = new Discord.MessageEmbed()
                .setColor(colors.green)
                .setTitle(`${competition[x].object.displayName} was made a captain!`)

                return message.channel.send({ embeds: [embed] })
            }
        }
    },

    getRoleFromMention: function (mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@&') && mention.endsWith('>')) {
            mention = mention.slice(3, -1);
    
            return mention;
        }
    }
}