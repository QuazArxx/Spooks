const Discord = require('discord.js')
const fs = require('fs')

const functions = require('../../functions')
const competition = require('../../competition.json')

module.exports = {
    name: 'end',
    description: 'Ends the current competition and removes the competitor role from all participants.',
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        if (functions.isThereCompetition == false) {
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('There is no competition going on.')
            
            return message.channel.send({ embeds: [embed] })
        }

        functions.isThereCompetition = false

        // Remove competitor role from participants
        for (let x = 0; x < competition.length; x++) {
            message.guild.members.cache.get(competition[x].object.userId).roles.remove('775547730901729330')
        }
        
        // Set the competition array to empty
        competition.length = 0

        fs.writeFile('./competition.json', JSON.stringify(competition), err => {
            if (err) console.error(err);
        });

        // Send a confirmation message
        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('The competition has officially ended.')

        await message.channel.send({ embeds: [embed] })
    }
}