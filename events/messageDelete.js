const client = require("../index");

client.on('messageDelete', async (message) => {
    let snipes = client.snipes.get(message.channel.id) || [];
    if(snipes.length > 10) snipes = snipes.slice(0, 9);

    snipes.unshift({
        content: message.content,
        user: message.member,
        img: message.attachments.first() 
            ? message.attachments.first().proxyURL
            : null,
        time: Date.now()
    });

    client.snipes.set(message.channel.id, snipes);
    
})