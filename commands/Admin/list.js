const Discord = require('discord.js')

const competition = require('../../competition.json')
const colors = require('../../colors.json')

module.exports = {
    name: 'list',
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        if (competition.length == 0) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('List is empty.')

            return message.channel.send({ embeds: [embed] })
        }

        let competitors = ''
        let competitors1 = ''
        let counter = 1
        for (let x = 0; x < competition.length; x++) {
            if (args[0] == 'full') {
                if (x <= competition.length / 2) {
                    competitors += `${counter}. ${competition[x].object.displayName}\n`
                    counter++
                } else if (x > competition.length / 2) {
                    competitors1 += `${counter}. ${competition[x].object.displayName}\n`
                    counter++
                }
            } else {
                if (!competition[x].isCaptain && !competition[x].isOnTeam) {
                    if (x <= competition.length / 2) {
                        competitors += `${counter}. ${competition[x].object.displayName}\n`
                        counter++
                    } else if (x > competition.length / 2) {
                        competitors1 += `${counter}. ${competition[x].object.displayName}\n`
                        counter++
                    }
                }
            }
            
        }
        
        const embed = new Discord.MessageEmbed()
        .setColor(colors.black)
        .setTitle(`__Phasmo Competitors:__ ${competition.length}`)
        .addField(competitors, '\u200B')

        const embed1 = new Discord.MessageEmbed()
        .setColor(colors.black)
        .setTitle('__Phasmo Competitors Cont.__')
        .addField(competitors1, '\u200B')

        await message.channel.send({ embeds: [embed, embed1] })
    }
}