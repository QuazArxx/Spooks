const Discord = require('discord.js');

const { prefix } = require('../../config.json');
const shortcuts = require('../../wikiShortcuts.json');

module.exports = {
    name: 'wiki',
    description: 'Posts the link to the Wiki Fandom',
    execute(message, args) {
        args = message.content.slice(prefix.length).split(' ');

        let ghosts = [
            'phantom', 'spirit', 'poltergeist', 'demon', 'wraith', 
            'mare', 'revenant', 'banshee', 'oni', 'yurei', 'shade', 'jinn' 
        ];

        let equipment = [
            'candle', 'crucifix', 'emf_reader', 'flashlight', 'ghost_writing_book',
            'glow_stick', 'head_mounted_camera', 'infrared_light_sensor',
            'lighter', 'motion_sensor', 'parabolic_microphone', 'photo_camera',
            'salt_shaker', 'sanity_pills', 'smudge_sticks', 'sound_sensor', 'spirit_box',
            'strong_flashlight', 'thermometer', 'tripod', 'uv_flashlight', 'video_camera'
        ]


        // Posts the general link to the wiki if there's no argument
        if (!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle('__Phasmophobia Wiki__')
            .addField('https://phasmophobia.fandom.com/wiki/Main_Page', '\u200B')

            return message.channel.send(embed)
        }

        // Sets argument to lowercase
        let choice = args[1].toLowerCase()

        // Changes shortcuts to one of the options
        for (let x = 0; x < shortcuts.length; x++) {
            if (shortcuts[x].shortcut == choice) {
                choice = shortcuts[x].name
                break;
            }
        }

        // Posts the link for the ghost or equipment the user chooses
        if (ghosts.includes(choice) || equipment.includes(choice)) {
            if (choice == 'wraith') {
                const embed = new Discord.MessageEmbed()
                .setColor('#000000')
                .setTitle(`__Phasmophobia Wiki: ${choice.charAt(0).toUpperCase() + choice.slice(1)}__`)
                .addField(`https://phasmophobia.fandom.com/wiki/${choice.charAt(0).toUpperCase() + choice.slice(1)}`, '*Also, according to Quaz, it\'s the only ghost that will kill you through a door.*')

                return message.channel.send(embed)
            }

            const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTitle(`__Phasmophobia Wiki: ${choice.charAt(0).toUpperCase() + choice.slice(1)}__`)
            .addField(`https://phasmophobia.fandom.com/wiki/${choice.charAt(0).toUpperCase() + choice.slice(1)}`, '\u200B')

            return message.channel.send(embed)
        }

        // Error message if they didn't type something on any list
        const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Please check the spelling of the ghost or equipment you entered.\n\nType "!wiki shortcuts" for a list of shortened words you can use.')

        message.channel.send(embed)
    }
}