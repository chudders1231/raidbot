const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const dotenv = require('dotenv').config();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.login(process.env.BOT_TOKEN);
