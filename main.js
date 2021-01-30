const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.login('ODAzMjc0NzIxOTg2MzQ3MDY5.YA7Z4Q.m1ZU_LKWLTP8a4Zif1p1l-SP76Q');