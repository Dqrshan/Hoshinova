const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'Shows all available commands',

    run: async(client, message, args) => {
        if(!args[0]){
            let categories = [];

            // ignoring owner-only folder
            const ignore = ['utils'];

            // scanning through all files
            readdirSync("./commands/").forEach((dir) => {
                if(ignore.includes(dir)) return; // ignored the directories in our help embed
                const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
                const cmds = commands.filter((c) => {
                    let file = require(`../../commands/${dir}/${c}`);
                    return !file.hidden;
                }).map((cmd) => {
                    let file = require(`../../commands/${dir}/${cmd}`);
                    if(!file.name) return "undefined"; // if file doesn't have a name, it'll show "undefined"
                    
                    let name = file.name.replace('.js', ''); // File names will be shown as command names.
                    return `\`${name}\``; // this will be shown for each command
                });
                let data = new Object();

                data = {
                    name: dir.toUpperCase,
                    value: cmds.length === 0 
                        ? "Maintenance" // ignoring if category has no commands
                        : cmds.join(", ") // mapping all commands in field value
                }

                categories.push(data); // Finally defining our fields
            });

            // a dynamic help embed 
            const help = new MessageEmbed()
            .setTitle(`Commands List`, client.user.displayAvatarURL())
            .setDescription(`Use \`-help <command>\` for additional information.`)
            .addFields(categories) // all fields are here
            .setColor(message.guild.me.displayHexColor)

            return message.channel.send(help);
        } else {
            const command = client.commands.get(args[0].toLowerCase()); // Aliases support - soon!
            
            if(!command) return message.reply(`Invalid Command! Use \`-help\` for all the commands!`)

            // single help embed for a command
            const embed = new MessageEmbed()
            .setTitle(`${command.name} Command Details`)
            .addField('Command', command.name)
            .addField('Usage', command.usage ? `-${command.name} ${command.usage}` : `-${command.name}`)
            .addField('Description', command.description ? command.description : 'No Description')
            .setColor(message.guild.me.displayHexColor)

            return message.channel.send(embed)
        }
    }
}