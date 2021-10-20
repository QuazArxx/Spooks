const Discord = require ('discord.js')

const colors = require('../../colors.json')
module.exports = {
    name: 'help',
    description: 'Displays the list of categories of commands for more information',
    execute(client, message, args) {
        const allCommands = client.commands
        const category = args[0].toLowerCase()

        const commandsInCategories = allCommands.filter(command => command.category == category)
        const commandList = []

        commandList.push(commandsInCategories.map(cmd => cmd.name).join(', '))
        message.channel.send(commandList, { split: true })
    }
}