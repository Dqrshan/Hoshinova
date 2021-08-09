const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply('Pinging...').then(msg => {
            msg.edit(`Pong! Discord: ${Math.abs(Date.now() - message.createdTimestamp)}ms. API: ${client.ws.ping}ms.`)
        })
    },
};
