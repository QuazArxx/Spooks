const Discord = require('discord.js')

const competition = require('../../competition.json')
const colors = require('../../colors.json')
const functions = require('../../functions')
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
            if (args[0] == 'picked' && !(functions.playersPicked.length == 0)) {
                // set competitors equal to the picked array in functions
                if (x <= functions.playersPicked.length / 2) {
                    competitors += `${counter}. ${functions.playersPicked[x]}\n`
                    counter++
                } else if (x > functions.playersPicked.length / 2) {
                    competitors1 += `${counter}. ${functions.playersPicked[x]}\n`
                }
            } else {
                if (x <= competition.length / 2) {
                    competitors += `${counter}. ${competition[x].object.displayName}\n`
                    counter++
                } else if (x > competition.length / 2) {
                    competitors1 += `${counter}. ${competition[x].object.displayName}\n`
                    counter++
                }
            }
            
        }
        
        const embed = new Discord.MessageEmbed()
        .setColor(colors.black)
        .setTitle(`__Phasmo Competitors:__ ${competition.length}`)
        .addField(competitors, '\u200B')

        if (!(competitors1 == '')) {
            const embed1 = new Discord.MessageEmbed()
            .setColor(colors.black)
            .setTitle('__Phasmo Competitors Cont.__')
            .addField(competitors1, '\u200B')

            await message.channel.send({ embeds: [embed, embed1] })
        } else {
            await message.channel.send({ embeds: [embed] })
        }
        
    }
}