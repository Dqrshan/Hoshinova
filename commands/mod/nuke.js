const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nuke',
    description: 'Nukes a channel by cloning and deleting the current channel',
    usage: '[channel/ID]',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    run: async(client, message, args) =>{
            if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('Insufficient permissions, `MANAGE_CHANNELS`');

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
            channel.clone({ parent: channel.parentID, position: channel.rawPosition }).then((ch) => {
                ch.send(new MessageEmbed()
                    .setAuthor(`${message.author.username} nuked the channel`, message.author.displayAvatarURL({ dynamic: true }))
                    .setImage("https://images-ext-1.discordapp.net/external/kzvuR-JZPvlGBXXi_cLs8h05K_2i7GzCgqPYk5tKoJk/https/i.gifer.com/V5p.gif")
                    .setColor(message.member.displayHexColor === '#000000'
                        ? "#FFFFFF"
                        : message.member.displayHexColor
                    )
                );
            });
            channel.delete();

            await message.channel.send(`\`☑️\` | Nuked \`${channel.name}\``)
    }
}