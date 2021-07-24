const { queue } = require('../../functions')
module.exports = {
    name: 'stop',
    description: 'Stops and empties the queue',
    execute(message, args) {
        stopSong(message, queue.get(message.guild.id))
    }
}

const stopSong = async (message, serverQueue) => {
    if (!serverQueue) {
        return message.channel.send('There are no songs in the queue!')
    }

    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()

    await message.channel.send('Playing stopped. Use !play to queue more songs.')
}