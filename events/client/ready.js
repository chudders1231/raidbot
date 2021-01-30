module.exports = (Discord, client, message) => {
    const fs = require('fs');
    const https = require('https');
    const options = {
        hostname: 'chadlymasterson.co.uk',
        port: 443,
        path: '/ffxiv/raid/php/nextraid.php',
        method: 'GET'
    }

    function setDateTime()  {
        var file = JSON.parse(fs.readFileSync('raidChannel.json', 'utf8'));
      
        client.channels.fetch(file.id).then(cha => {
            var req = https.request(options, res => {
                res.on('data', d => {
                    var pd = JSON.parse(d.toString());
                    var text = pd.Day + " " +pd.Time;
                    cha.setName(text);
                })
              })
              req.on('error', error => {
                console.error(error)
              })
              
              req.end()
        })
    };

    function setActivity() {
        var file = JSON.parse(fs.readFileSync('activityChannel.json', 'utf8'));
      
        client.channels.fetch(file.id).then(chan => {
            var req = https.request(options, res => {
                res.on('data', d => {
                    var pd = JSON.parse(d.toString());
                    var text = pd.Activity;
                    chan.setName(text);
                })
              })
              req.on('error', error => {
                console.error(error)
              })
              
              req.end()
        })
    }
    const raidChT = setInterval( () => {

        fs.access('raidChannel.json', fs.F_OK, (err) => {
            if (err) {
              console.error(err)
              return
            }
            setDateTime();
          })

    }, 300000);
    const activityChT = setInterval(() => {

        fs.access('activityChannel.json', fs.F_OK, (err) => {
            if (err) {
              console.log(err);
              return;
            }
            setActivity(Discord, client);
          })

    }, 300000);

};