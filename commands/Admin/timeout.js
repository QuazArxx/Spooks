const fs = require('fs')

const phasMembers = require('../../members.json');

module.exports = {
    name: 'timeout',
    description: 'Puts the person in timeout',
    execute(message, args) {
        // Only Lexi can use this command
        if (!(message.author.id == '771120373940224000')) {
            if (message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Only Lexi can use this command!')
            else return
        }

        if (!message.mentions.users.size) return message.channel.send('You forgot to mention someone!')

        let target = message.mentions.users.first()

        // Pushes information of mentioned user if they're not already on the list
        if (!phasMembers.some(user => user.id === target.id)) {
            phasMembers.push({
                name: target.username,
                id: target.id,
                roles: [],
                inTimeout: false
            })
        }
        
        // Remove roles from file, then add current roles to file, then change inTimeout
        for (let x = 0; x < phasMembers.length; x++) {
            if (phasMembers[x].id == target.id) {
                phasMembers[x].roles.length = 0
                phasMembers[x].inTimeout = true
                if (!message.guild.members.cache.get(target.id)) {
                    phasMembers[x].roles.length = 0
                    phasMembers[x].roles.push(message.guild.members.cache.get(target.id).roles.cache)
                    phasMembers[x].inTimeout = true
                }  
            }
        }

        fs.writeFile('./members.json', JSON.stringify(phasMembers), err => {
            if (err) console.error(err);
        });

        // Remove all roles and add timeout role
        message.guild.members.cache.get(target.id).roles.set([])
        message.guild.members.cache.get(target.id).roles.add('842463222446817370')

        message.channel.send(`${target.username} was put in timeout!`)
    }
}