const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'snipe',
    description: 'Snipe upto 10 last deleted messages',
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {

        const snipes = client.snipes.get(interaction.channel.id);
        if(!snipes) return interaction.followUp(`Nothing to snipe!`);

        const snipe = +args[0] - 1 || 0;
        const sniped = snipes[snipe];
        if(!sniped) return interaction.followUp(`Failed to snipe!`);

        const { content, user, img, time } = sniped;

        const embed = new MessageEmbed()
            .setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))
            .setDescription(content)
            .setImage(img)
            .setFooter(moment(time).fromNow())
            .setColor(user.displayHexColor)
        
        return interaction.followUp(embed)
    }
}