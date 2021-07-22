module.exports = {
    name: 'disconnect',
    description: 'Allows Spooks to leave a voice channel',
    aliases: 'dc',
    async execute(message, args) {
        const connection = await message.member.voice.channel.leave()
    }
}