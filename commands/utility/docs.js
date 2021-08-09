const { Client, Message, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'docs',
    aliases: ['djs'],
    description: 'Discord.JS v12 Documentation',
    usage: '<key>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    run: async(client, message, args, Discord) =>{
        const query = args.join(" ");
        if(!query) return message.reply('Incorrect usage');

        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;
        axios.get(url).then(({ data }) =>{
            if(data){
                message.channel.send({ embed: data });
            } else {
                message.channel.send(`Couldn't find what you were looking for.`)
            }
        })
    }
}