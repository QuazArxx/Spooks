const { queue } = require('../../functions')
module.exports = {
    name: 'skip',
    description: 'Skips the current song in the queue',
    execute(client, message, args) {
        skipSong(message, queue.get(message.guild.id))
    }
}

const skipSong = async (message, serverQueue) => {
    if (!message.member.voice.channel) {
        return message.channel.send('You\'re not in a voice channel!')
    }

    if (!serverQueue) {
        return message.channel.send('There are no songs in the queue!')
    }

    serverQueue.connection.dispatcher.end()
}