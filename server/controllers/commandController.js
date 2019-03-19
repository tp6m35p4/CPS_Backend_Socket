var socket = require('../services/socket');

module.exports = {
    index: function(req, res) {
        
        socket.write(req.params.command, req.body.id, function(success, msg) {
            if(success) {
                res.json({
                    msg: success
                });
            } else {
                res.json({
                    msg: msg
                });
            }
        });
    }
}