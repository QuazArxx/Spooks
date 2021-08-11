const Discord = require('discord.js');

const { prefix } = require('../../config.json');
const ghosts = require('../../ghosts.json');
const equipment = require('../../equipment.json');

module.exports = {
    ghost: '',
    tool: '',
    name: 'wiki',
    description: 'Posts the link to the Wiki Fandom',
    execute(message, args) {
        args = message.content.slice(prefix.length).split(' ');

        // Posts the general link to the wiki if there's no argument
        if (!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle('__Phasmophobia Wiki__')
            .addField('https://phasmophobia.fandom.com/wiki/Main_Page', '\u200B')

            return message.channel.send({ embeds: [embed] })
        } else if (args[1] == 'shortcuts') {
            let ghostShortcuts = []
            let equipShortcuts = []

            for (let x = 0; x < ghosts.length; x++) {
                if (!(ghosts[x].shortcut == 'none')) {
                    ghostShortcuts.push(ghosts[x].shortcut)
                }
            }

            for (let x = 0; x < equipment.length; x++) {
                if (!(equipment[x].shortcut == 'none')) {
                    equipShortcuts.push(equipment[x].shortcut)
                }
            }
            const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle('__Ghost and Equipment Shortcuts__')
            .addFields(
                {name: 'Ghosts:', value: ghostShortcuts.join(', ')},
                {name: 'Equipment:', value: equipShortcuts.join(', ')}
            )

            return message.channel.send({ embeds: [embed] })
        }

        // Sets argument to lowercase
        let choice = args[1].toLowerCase()
    
        // Empties the temporary variables
        this.ghost = ''
        this.tool = ''

        // Checks the ghost list to see if the choice is one of the options
        for (let x = 0; x < ghosts.length; x++) {
            if (ghosts[x].shortcut == choice || ghosts[x].lowercase == choice) {
                this.ghost = ghosts[x].capitalize
                break;
            }
        }


        // Checks the equipment list to see if the choice is one of the options
        if (this.ghost == '') {
            for (let x = 0; x < equipment.length; x++) {
                if (equipment[x].shortcut == choice || equipment[x].lowercase == choice) {
                    this.tool = equipment[x].capitalize
                    break;
                }
            }
        }

        // Posts the link for the ghost or equipment the user chooses
        if (!(this.ghost == '')) {
            if (this.ghost == 'Wraith') {
                const embed = new Discord.MessageEmbed()
                .setColor('#000000')
                .setTitle(`__Phasmophobia Wiki: ${this.ghost}__`)
                .addField(`https://phasmophobia.fandom.com/wiki/${this.ghost}`, '*Also, according to Quaz, it\'s the only ghost that will kill you through a door.*')

                return message.channel.send({ embeds: [embed] })
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor('#000000')
                .setTitle(`__Phasmophobia Wiki: ${this.ghost}__`)
                .addField(`https://phasmophobia.fandom.com/wiki/${this.ghost}`, '\u200B')

                return message.channel.send({ embeds: [embed] })
            }
        } else if (!(this.tool == '')) {
            const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle(`__Phasmophobia Wiki: ${this.tool}__`)
            .addField(`https://phasmophobia.fandom.com/wiki/${this.tool}`, '\u200B')

            return message.channel.send({ embeds: [embed] })
        }

        // Error message if they didn't type something on any list
        const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Please check the spelling of the ghost or equipment you entered.\n\nType "!wiki shortcuts" for a list of shortened words you can use.')

        message.channel.send({ embeds: [embed] })
    }
}