const Discord = require('discord.js')
const fs = require('fs')

const functions = require('../../functions')
const competition = require('../../competition.json')

module.exports = {
    name: 'end',
    description: 'Ends the current competition and removes the competitor role from all participants.',
    permissions: 'ADMINISTRATOR',
    async execute(message, args) {
        // Remove competitor role from participants

        // Set the competition array to empty

        // Send a confirmation message
    }
}