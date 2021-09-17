const Discord = require('discord.js')

const competition = require('../../competition.json')
const colors = require('../../colors.json')
const functions = require('../../functions')

let fiveLoopCounter
let loopCounter
let compCounter
let competitors
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

        fiveLoopCounter = 0
        loopCounter = 0
        compCounter = 0
        competitors = []

        /*let competitors = ''
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
                    counter++
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
        
        // ADJUST EMBEDS FOR PICKED AND MAKE THEM DYNAMIC ** Use For loop (Check !start)
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
        }*/
        
        // Use an array instead and set addFields to be each element. Maybe only take up to 5 players at a time to add to the message. Maybe done in For loop
    },

    getFullList: function (message) {
        let competitionLengthCounter = competition.length
        let counter = 1
        while (competitionLengthCounter >= 5) {
            if (competitionLengthCounter >= 5) {
                this.getFiveCompetitors()

                const embed = new Discord.MessageEmbed()
                .setColor(colors.black)
                .setTitle('__Phasmo Competitors:__')
                .addFields(
                    {name: `${counter}. ${competitors[0]}`},
                    {name: `${counter + 1}. ${competitors[1]}`},
                    {name: `${counter + 2}. ${competitors[2]}`},
                    {name: `${counter + 3}. ${competitors[3]}`},
                    {name: `${counter + 4}. ${competitors[4]}`}
                )

                counter += 5
                competitionLengthCounter -= 5
            }
        }
        if (competitionLengthCounter > 0 && competitionLengthCounter < 5) {
            this.getRestCompetitors()
        }
    },

    getPickedList: function (message) {

    },

    getFiveCompetitors: function () {
        competitors.length = 0

        for (let x = 0; x < 5; x++) {
            competitors.push(competition[compCounter].object.displayName)
            compCounter++
        }
    },

    getRestCompetitors: function () {
        competitors.length = 0

        for (let x = 0; x < compCounter; x ++) {
            competitors.push()
        }
    }
}