const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['clear', 'prune'],
    description: 'Clear a given amount of messages (excluding pinned messages)',
    usage: '<number>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    run: async(client, message, args) =>{
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Insufficient Permissions, `MANAGE_MESSAGES`');

        const number = parseInt(args[0]);
        if(isNaN(number)) return message.reply('Enter a valid number!');

        if(number < 1 || number > 99) return message.reply('Cannot clear less than `1` or more than `100` messages!');
        const msgs = number + 1;

        await message.channel.bulkDelete(
            (await message.channel.messages.fetch({ limit: msgs }))
            .filter(message => !message.pinned) 
        ).catch(err =>{
            message.channel.send(`Failed to clear messages, ${err}`)
        });

        message.channel.send(`\`☑️\` | \`${number}\` messages cleared!`)
        .then(m =>{
            m.delete({ timeout: 4000 })
        })
        .catch(console.error)
    }
}