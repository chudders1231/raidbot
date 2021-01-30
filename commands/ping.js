module.exports = {
    name: 'ping',
    description: 'pongs the ping!',
    execute( client, message, args, Discord) {

        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
        const embed = new Discord.MessageEmbed().setTitle('Ping!').setColor(0xff0000).setDescription('Pong!');

        message.channel.send(embed);
    }
};