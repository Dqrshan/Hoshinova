const { Client, Message, MessageEmbed } = require('discord.js');
const { type } = require('os');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    hidden: true,
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    run: async(client, message, args) =>{
        if(message.author.id !== "838620835282812969") return;
        
        const code = args.join(" ");
        if(!code) return message.reply("Provide a code to evaluate.");
        if(code.includes("token")) return message.channel.send(`~~You Tried~~`, { code: 'js' })
        try {
            const result = await eval(code);
            let output = result;
            if(typeof result !== "string"){
                output = inspect(result);
            }

            message.channel.send(output, { code: 'js' })
        } catch (error) {
            console.log(error)
            message.channel.send('Failed to evaluate.')
        }
    }
}