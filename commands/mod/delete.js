const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'delete',
    description: 'Delete a Text/Voice channel or a category(ID)',
    usage: '<ID/channel>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    run: async(client, message, args) =>{
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('Insufficient permissions, `MANAGE_CHANNELS`');

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!channel) return message.reply('Incorrect Usage');

        await channel.delete().catch(e =>{
            if(e){
                return message.channel.send(`\`❎\` | Error Deleting : \`${e}\``)
            }
        })
        await message.channel.send(`\`☑️\` | Deleted \`${channel.name}\``)
    }
}