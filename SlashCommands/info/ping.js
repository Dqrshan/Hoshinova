const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `Pong! Discord: ${Math.abs(Date.now() - interaction.createdTimestamp)}ms. API: ${client.ws.ping}ms.`, ephemeral: true });
    },
};
