var net = require('net');
var connectConfig = require('../configs/connectConfig');
var commandConfig = require('../configs/commandConfig');
// var client = net.connect(connectConfig.PORT, connectConfig.IP, function(){
//     cb(true, null)
// });
var client = new net.Socket();
client.connect(connectConfig.PORT, connectConfig.IP);
client.on('close', () => {
    console.log("do close");
    setTimeout(function() {
        client.connect(connectConfig.PORT, connectConfig.IP);
        console.log("reconnecting...")
        // client.on('connect', () => {
        //     console.log("reconnected")
        //     clearTimeout();
        // })
    }, 1000);
});

client.on('connect', () => {
    console.log("connected")
    clearTimeout();
});
client.on('error', (err) => {
    console.log("error")
});

module.exports = {
    write: function(command, id, cb) {
        if(command in commandConfig) {
            var tmpCmd = commandConfig[command];
            tmpCmd.id = id;
            client.write(JSON.stringify(tmpCmd));
            cb(true, null)
        } else {
            cb(false, "not in config")
        }
    }
}