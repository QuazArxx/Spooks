const Discord = require('discord.js');

module.exports = {
    name: 'trello',
    description: 'posts the link to the Phasmophobia trello board',
    aliases: 't',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('__Phasmophobia Trello Board__')
        .addField('https://trello.com/b/9QrnqQ1j/phasmophobia', '\u200B')

        message.channel.send(embed)
    }
}