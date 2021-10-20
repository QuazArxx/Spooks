const Discord = require('discord.js')

const competition = require('../../competition.json')
const colors = require('../../colors.json')
const functions = require('../../functions')
const playersPicked = require('../../PlayersPicked.json')

module.exports = {
    name: 'list',
    permissions: 'ADMINISTRATOR',
    category: 'competition',
    async execute(client, message, args) {
        if (functions.isThereCompetition == false) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('There is no competition happening at this time.')

            return message.channel.send({ embeds: [embed] })
        }
        if (competition.length == 0) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTitle('Nobody has joined the competition yet.')

            return message.channel.send({ embeds: [embed] })
        }

        let compCounter = 0
        let competitors = []

        // NEEDS TO BE FINISHED
        /*if (args[0] == 'picked') {
            if (!playersPicked == 0) {
                this.getPickedList(competitors)
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor(colors.red)
                .setTitle('No players have been picked yet.')

                return message.channel.send({ embeds: [embed] })
            }
        } else {
            this.getFullList(message, compCounter, competitors)
        }*/

        this.getFullList(message, compCounter, competitors)
    },

    getFullList: function (message, compCounter, competitors) {
        let competitionLengthCounter = competition.length
        let counter = 1
        while (competitionLengthCounter >= 5) {
            if (competitionLengthCounter >= 5) {
                this.getFiveCompetitors(compCounter, competitors)

                const embed = new Discord.MessageEmbed()
                .setColor(colors.black)
                .setTitle('__Phasmo Competitors:__')
                .addFields(
                    {name: `${counter}. ${competitors[0]}`, value: '\u200B'},
                    {name: `${counter + 1}. ${competitors[1]}`, value: '\u200B'},
                    {name: `${counter + 2}. ${competitors[2]}`, value: '\u200B'},
                    {name: `${counter + 3}. ${competitors[3]}`, value: '\u200B'},
                    {name: `${counter + 4}. ${competitors[4]}`, value: '\u200B'}
                )

                message.channel.send({ embeds: [embed] })

                counter += 5
                competitionLengthCounter -= 5
            }
        }
        if (competitionLengthCounter > 0 && competitionLengthCounter < 5) {
            this.getRestCompetitors(competitionLengthCounter, compCounter, competitors)

            const embed = new Discord.MessageEmbed()
            .setColor(colors.black)
            .setTitle('__Phasmo Competitors:__')

            for (let x = 0; x < competitionLengthCounter; x++) {
                embed.addField(`${counter}. ${competitors[x]}`, '\u200B')
                counter++
            }

            message.channel.send({ embeds: [embed] })
        }
    },

    getPickedList: function (message) {
        let pickedLengthCounter = playersPicked.length
        let counter = 1

        if (pickedLengthCounter < 5) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.black)
            .setTitle('__Picked Competitors:__')

            for (let x = 0; x < pickedLengthCounter; x++) {
                embed.addField(`${counter}. ${playersPicked[x]}`, '\u200B')
                counter ++
            }

            message.channel.send({ embeds: [embed] })
        } else {
            this.getFivePicked(compCounter, competitors)
        }
    },

    getFiveCompetitors: function (compCounter, competitors) {
        competitors.length = 0

        for (let x = 0; x < 5; x++) {
            competitors.push(competition[compCounter].object.displayName)
            compCounter++
        }
    },

    getRestCompetitors: function (competitionLengthCounter, compCounter, competitors) {
        competitors.length = 0

        for (let x = 0; x < competitionLengthCounter; x ++) {
            competitors.push(competition[compCounter].object.displayName)
            compCounter++
        }
    },

    getFivePicked: function (compCounter, competitors) {
        competitors.length = 0
    }
}