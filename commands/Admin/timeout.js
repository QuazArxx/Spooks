const fs = require('fs')

const members = require('../../members.json')

module.exports = {
    name: 'timeout',
    description: 'Puts the person in timeout',
    execute(message, args) {
        // Pushes information of mentioned user if they're not already on the list
        if (!members.some(user => user.id === message.mentions.users.first().id)) {
            members.push({
                name: message.mentions.users.first().username,
                id: message.mentions.users.first().id,
                roles: []
            })
        }
        
        // Push all information to members.json
        for (let x = 0; x < members.length; x++) {
            if (!members) return
        }

        // Remove all roles
            // Check through every role the user has and remove it
            // Add the timeout role
    
    }
}