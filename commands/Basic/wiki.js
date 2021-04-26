const Discord = require('discord.js');

const { prefix } = require('../../config.json');

module.exports = {
    name: 'wiki',
    description: 'Posts the link to the Wiki Fandom',
    execute(message, args) {
        args = message.content.slice(prefix.length).split(' ');

        let ghosts = ['phantom', 'spirit', 'poltergeist', 'demon', 'wraith', 'mare', 'revenant', 'banshee', 'oni', 'yurei', 'shade', 'jinn'];

        if (!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle('__Phasmophobia Wiki__')
            .addField('https://phasmophobia.fandom.com/wiki/Main_Page', '\u200B')

            return message.channel.send(embed)
        }

        let choice = args[1].toLowerCase()

        if (choice == 'rev') {
            choice = 'revenant'
        } else if (choice == 'polt') {
            choice = 'poltergeist'
        }

        if (ghosts.includes(choice)) {
            const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle(`__Phasmophobia Wiki: ${choice.charAt(0).toUpperCase() + choice.slice(1)}__`)
            .addField(`https://phasmophobia.fandom.com/wiki/Ghosts#${choice.charAt(0).toUpperCase() + choice.slice(1)}`, '\u200B')

            return message.channel.send(embed)
        }

        const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Please check the spelling of the ghost.\n\nFor Revenant and Poltergeist, you can use the shortened version "rev" or "polt" respectively.')

        message.channel.send(embed)
    }
}