const Discord = require('discord.js');

const { prefix } = require('../../config.json');

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
        } else if (choice == 'headcam') {
            choice = 'head_mounted_camera'
        } else if (choice == 'glowstick') {
            choice = 'glow_stick'
        } else if (choice == 'emf') {
            choice = 'emf_reader'
        } else if (choice == 'book') {
            choice = 'ghost_writing_book'
        } else if (choice == 'ir') {
            choice = 'infrared_light_sensor'
        } else if (choice == 'pills') {
            choice = 'sanity_pills'
        } else if (choice == 'smudge') {
            choice = 'smudge_sticks'
        }

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

        const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Please check the spelling of the ghost.\n\nFor Revenant and Poltergeist, you can use the shortened version "rev" or "polt" respectively.')

        message.channel.send(embed)
    }
}