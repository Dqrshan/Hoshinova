const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'code',
    description: 'DiscordJS code pattern',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    run: async(client, message, args) =>{
        message.channel.send(new MessageEmbed()
            .setDescription([
                "```js",
                "const Discord = require('discord.js');",
                "const client = new Discord.Client();",
                "const prefix = '!';",
                "\u200b",
                "client.on('ready', () => {",
                "   console.log(`${client.user.tag} online`)",
                "});",
                "\u200b",
                "client.on('message', message => {",
                "   if(message.content === `${prefix}ping`){",
                "       message.channel.send(`${client.ws.ping} ms`);",
                "});",
                "\u200b",
                "client.login('token-here');",
                "```"
            ])
        )
    }
}
/**
 * const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';

client.on('ready', () => {
    console.log(`${client.user.tag} online`)
});

client.on('message', message => {
    if(message.content === `${prefix}ping`){
          message.channel.send(`${client.ws.ping} ms`);
});

client.login('token-here');
 */