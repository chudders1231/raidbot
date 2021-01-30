const fs = require('fs');
module.exports = {
    name: 'setup',
    description: 'Starts the setup for the Raid Bot!',
    execute( client, message, args, Discord) {

        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
        const embed = new Discord.MessageEmbed().setTitle('Setup Step 1').setColor(0xff0000).setDescription('Please type the ID of the channel used to display the date and time of raid!');
        message.channel.send(embed).then(() => {
            const filter = m => Number(m.content);
            message.channel.awaitMessages( filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then( mes => {
                const chaID = mes.first().content;
                const noop = () => {};
                if(client.channels.fetch(chaID)) {

                    client.channels.fetch(chaID).then(cha => {
                        var val = {
                            id: chaID
                        }
                        fs.writeFile( "raidChannel.json", JSON.stringify( val ), "utf8", noop );
                        message.channel.send("Step 1 Complete!");
                        const emb = new Discord.MessageEmbed().setTitle('Setup Step 2').setColor(0xff0000).setDescription('Please type the ID of the channel used to display the raid activity!');
                        
                        message.channel.send(emb).then(() => {
                            const filter = m => Number(m.content);
                            message.channel.awaitMessages( filter, {
                                max: 1,
                                time: 30000,
                                errors: ['time']
                            }).then( mes => {
                                const chaID = mes.first().content;
                                const noop = () => {};
                                if(client.channels.fetch(chaID)) {
                
                                    client.channels.fetch(chaID).then(cha => {
                                        var val = {
                                            id: chaID
                                        }
                                        fs.writeFile( "activityChannel.json", JSON.stringify( val ), "utf8", noop );
                                        message.channel.send("Setup Complete!");
                    
                                    })
                
                                }
                            })
                        });
                    })

                }
            })
        });
    }
}; 