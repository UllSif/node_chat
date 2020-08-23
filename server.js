var express = require('express')();
var server = require('http').createServer(express);
var io = require('socket.io').listen(server);
var ent = require('ent');

express.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, userName) {

    socket.on('nouveauClient', function (userName) {
        userName = ent.encode(userName);
        socket.userName = userName;
        socket.broadcast.emit('nouveauClient', userName);
    });

    socket.on('message', function (message) {
        socket.message = message;
    });

    socket.on('message', function(message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {userName: socket.userName, message: message});
    })
});


server.listen(3000);
