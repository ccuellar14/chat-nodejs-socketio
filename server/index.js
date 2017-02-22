var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/test', function(req, res) {
    res.status(200).send('Route Run');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al Chat',
    nickname: 'Charly'
}];

io.on('connection', function(socket) {
    console.log("New Connection for: " + socket.handshake.address);
    socket.emit('messages', messages);

    socket.on('add-message', function(data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(3001, function() {
    console.log('Server Run');
});