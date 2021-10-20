const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const colors = require('./colors.json')
const welcomeMessage = require('./messages.json');

// Use these variables for timeout functions
const second = 1000;
const minute = 1000 * 60;
const hour = 1000 * 60 * 60;
const day = 1000 * 60 * 60 * 24;

const discordIntents = new Discord.Intents()
discordIntents.add(Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES)

// Declares the client and the commands for the handler
const client = new Discord.Client({ intents: discordIntents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

const folders = fs.readdirSync('./commands'); // read the directory of folders

for (var folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`); // for each folder, read the files in the folder
    for (var file of files) {
        const command = require(`./commands/${folder}/${file}`); // for each file, set the command
        client.commands.set(command.name, command);
    }
}

// When client turns on it logs that it's on
client.once('ready', () => {
	console.log(`${client.user.username} is online!`);
});

client.on('guildMemberAdd', async member => {
	member.roles.add('867578765085507636')

	const embed = new Discord.MessageEmbed()
	.setColor(colors.black)
	.setTitle('Formal welcome to the Phasquad server! I bet you were forced to join by those chucklefucks.')

	const embed1 = new Discord.MessageEmbed()
	.setColor(colors.black)
	.setTitle('Well you\'ll have a riveting time here. All we ask is that you read the rules and use the server for its intended purposes: grouping up. If you don\'t play or talk, we\'ll kick ya. Have fun!')

	await member.send({ embeds: [embed, embed1] })


})

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();

	if (user.bot) return;
	if (!reaction.message.guild) return;

	if (reaction.message.channel.id == '843181553772396588') {
		if (reaction.emoji.name == '✅') {
			if (reaction.message.guild.members.cache.get(user.id).roles.cache.get('867578765085507636')) {
				await reaction.message.guild.members.cache.get(user.id).roles.remove('867578765085507636')

				let randomMessage = welcomeMessage[Math.floor(Math.random() * welcomeMessage.length)]

				const welcomeEmbed = new Discord.MessageEmbed()
				.setColor('#000000')
				.setTitle(`Hey ${user.username} ${randomMessage}`)
			
				await client.channels.cache.get('830293335611801649').send({ embeds: [welcomeEmbed] });
			}
		}
	}
})

// This is the start of the main function when the bot is turned on
client.on('messageCreate', message => {

	// Checks if bot says a message or if not in the server
	if (message.author.bot || !message.guild) return;

	// The bot will not respond if there is no prefix,
	// the user that typed it was a bot,
	// or if it was not sent from in the server
	if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

	// Creates the arguments variable and separates it with a space
	// and creates the command variable
	const args = message.content.slice(prefix.length).split(' ');
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases == commandName);
	
	if (!command) return;
	
	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You cannot do this!');
		}
	}

	if (command.guildOnly && message.channel.type !== 'GUILD_TEXT') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	try {
		command.execute(client, message, args);
	}
	catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!\nCheck the console for details.');
	}
});
// This logs in the bot with the specified token found in config
client.login(token);