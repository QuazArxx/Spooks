module.exports = {
    name: 'prune',
    description: 'Removes messages depending on the amount entered.',
    aliases: ['purge', 'delete'],
    permissions: 'ADMINISTRATOR',
    category: 'admin',
    execute(client, message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.channel.send('That doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.channel.send('You need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to delete messages in this channel!');
        });

        message.channel.send('Messages successfully deleted!').then(botMessage => botMessage.delete({timeout:5000}));
    },
};