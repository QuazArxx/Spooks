const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const Discord = require('discord.js')

const { joinVoiceChannel } = require('@discordjs/voice');



const { queue } = require('../../functions')
const colors = require('../../colors.json')
module.exports = {
    name: 'play',
    description: 'Adds a song to the queue.',
    aliases: 'p',
    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.channel.send('You must be in a voice channel first!')
        }

        if (!args[0]) return message.channel.send('You need to put in a search term!')
        const serverQueue = queue.get(message.guild.id)

        let song = {}

        if (ytdl.validateURL(args[0])) {
            const songInfo = await ytdl.getInfo(args[0])
            song = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url}
        } else {
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query)
                return (videoResult.videos.length > 1) ? videoResult.videos[0]:null
            }

            const video = await videoFinder(args.join(' '))
            if (video) {
                song = {title: video.title, url: video.url}
            } else {
                const errorEmbed = new Discord.MessageEmbed()
                .setColor(colors.red)
                .setTitle('Error finding video')

                message.channel.send(errorEmbed)
            }
        }

        if (!serverQueue) {
            const queueConstructor = {
                voiceChannel: message.member.voice.channel,
                textChannel: message.channel,
                connection: null,
                songs: []
            }

            queue.set(message.guild.id, queueConstructor)
            queueConstructor.songs.push(song)

            try {
                const connection = joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.member.voice.channel.guild.id,
                    adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
                });
                queueConstructor.connection = connection
                videoPlayer(message.guild, queueConstructor.songs[0])
            } catch (err) {
                queue.delete(message.guild.id)
                console.error(err )
            }
        } else {
            serverQueue.songs.push(song)

            const added = new Discord.MessageEmbed()
            .setColor(colors.green)
            .setTitle(`**${song.title}** was added to the queue!`)

            message.channel.send(added)
        }
    }
}

const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id)

    if (!song) {
        songQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }

    const stream = ytdl(song.url, {filter: 'audioonly'})
    songQueue.connection.play(stream, {seek: 0, volume: 0.5}).on('finish', () => {
        songQueue.songs.shift()
        videoPlayer(guild, songQueue.songs[0])
    })

    const nowPlaying = new Discord.MessageEmbed()
    .setColor(colors.green)
    .setTitle(`Now Playing: **${song.title}**`)

    await songQueue.textChannel.send(nowPlaying)
}