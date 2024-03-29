const fs = require('fs')

const phasMembers = require('../../members.json');

module.exports = {
    name: 'timeout',
    description: 'Puts the person in timeout',
    aliases: 'to',
    permissions: 'ADMINISTRATOR',
    category: 'admin',
    async execute(client, message, args){
        // Only Lexi can use this command
        if (!(message.author.id == '771120373940224000')) {
            if (message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Only Lexi can use this command!')
            else return
        }
        
        const timeoutChannel = message.guild.channels.cache.get('842466744160223253')
        const anythingChannel = message.guild.channels.cache.get('840275450207272990')
        
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
        
        if (this.isInTimeout(target) == false) {
            // Remove roles from file, then add current roles to file, then change inTimeout
            for (let x = 0; x < phasMembers.length; x++) {
                if (phasMembers[x].id == target.id) {
                    phasMembers[x].inTimeout = true
                    
                    if (message.guild.members.cache.get(target.id).roles.cache.size > 0) {
                        message.guild.members.cache.get(target.id).roles.cache.filter(r => r.id != '830293335611801646').forEach(role => phasMembers[x].roles.push(role.id))
                    }  
                }
            }

            fs.writeFile('./members.json', JSON.stringify(phasMembers), err => {
                if (err) console.error(err);
            });

            // Checks if user is in a voice channel and removes them if they are
            if (message.guild.members.cache.get(target.id).voice.channel) {
                message.guild.members.cache.get(target.id).voice.setChannel(null)
            }

            // Remove all roles and add timeout role
            await message.guild.members.cache.get(target.id).roles.set([])
            await message.guild.members.cache.get(target.id).roles.add('842463222446817370')

            // Change Send Messages for Me and Saucy to false
            try {
                if (target.id == '387959359394807808' || target.id == '373641434798227488') {
                    timeoutChannel.permissionOverwrites.edit(target, {SEND_MESSAGES: false})
                }
            } catch (err) {
                console.error(err)
            }
            
            // Send confirmation messages
            if (target.id == '771120373940224000') {
                await message.channel.send(`If you feel the need to put yourself in timeout, you MUST'VE done something wrong, Alcoholic Stepdaddy.`)
                await timeoutChannel.send('Tsk, tsk, tsk. Bad Lexi.')
            } else {
                await message.channel.send(`${target.username} was put in timeout!`)
                await timeoutChannel.send(`What did you do now, ${target.username}?`)
            }

        } else if (this.isInTimeout(target) == true) {
            for (let x = 0; x < phasMembers.length; x++) {
                if (phasMembers[x].id == target.id) {
                    phasMembers[x].inTimeout = false
                      
                    if (phasMembers[x].roles.length > 0) {
                        phasMembers[x].roles.forEach(role => message.guild.members.cache.get(target.id).roles.add(role))
                        phasMembers[x].roles.length = 0
                    }
                }
            }
            
            fs.writeFile('./members.json', JSON.stringify(phasMembers), err => {
                if (err) console.error(err);
            });

            // Send confirmation messages
            await message.guild.members.cache.get(target.id).roles.remove('842463222446817370')

            if (target.id == '771120373940224000') {
                await timeoutChannel.send(`Behave yourself next time, Alcoholic Stepdaddy!`)
                await anythingChannel.send(`Alcoholic Stepdaddy, setting the best example since 1996.`)
            } else {
                await timeoutChannel.send(`${target.username} is no longer in timeout. FREEDOM!`)
                await anythingChannel.send(`${target.username} has been let out of timeout for good behavior. Or because Alcoholic Stepdaddy is too nice sometimes.`)
            }
        }
    },

    // Checks if the target is already in timeout or not
    isInTimeout: function(target) {
        for (let x = 0; x < phasMembers.length; x++) {
            if (phasMembers[x].id == target.id) {
                if (phasMembers[x].inTimeout == true) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
}