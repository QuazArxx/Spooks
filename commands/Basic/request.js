const Discord = require('discord.js')

const colors = require('../../colors.json');

module.exports = {
	name: 'request',
	description: 'Users can request new features for the bot',
	execute(message, args) {
        if(!args.length) {
            return message.channel.send('Please provide a request!0');
        } 

		const user = message.member;
		const request = message.content.replace('!request', '')

		const embed = new Discord.MessageEmbed()
        .setColor(colors.black)
        .setTitle(`${user.displayName} requests a new feature!`)
        .addField(`__New Feature:__`, `"**${request}**"`)

        // Deletes the command
        message.delete()

        const requestEmbed = new Discord.MessageEmbed()
        .setColor(colors.green)
        .setTitle('Your request has been submitted!')

        // replies to the user and deletes the reply after 5 seconds
        message.channel.send({ embeds: [requestEmbed] }).then(botMessage => {
            setTimeout(() => {
                botMessage.delete()
            }, 5000)
        })

        // Sends the embedded message above and removes the command from the response
        message.channel.send({ embeds: [embed] }).then(sentMessage => {
            // Reacts to it's own message and outputs an error to the console if an emoji can't be used
            sentMessage.react('✅')
            .then(() => sentMessage.react('❌'))
            .catch(() => console.error('One of the emojis didn\'t work!'))
        })
	},
};