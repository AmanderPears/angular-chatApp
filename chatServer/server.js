const express = require('express');
const app = express();
const path = require('path');

const HTTP_PORT = process.env.PORT || 8080;

const cors = require('cors');

app.use(express.static('public'));
app.use(cors());

var http = require('http').Server(app);
var io = require('socket.io')(http);

let clientList = [];

io.on('connection', socket => {
    let clientName = 'User-' + Math.floor(Math.random() * 100 + 1);

    clientList.push(socket.id);
    io.emit('requestClient', clientList);

    console.log(clientName + ' has connected');
    io.emit('chat message', clientName + ' has connected');

    socket.on('disconnect', () => {
        console.log(clientName + ' has disconnected');
        io.emit('chat message', clientName + ' has disconnected');
        //console.log("Before: " + clientList.length);
        for (var i = 0; i < clientList.length; ++i) {
            if (clientList[i] == socket.id) {
                clientList.splice(i, 1);
            }
        }
        //console.log("After: " + clientList.length);
    });

    socket.on('requestClients', () => {
        console.log("sent clientList to " + socket.id);
        socket.emit('requestClients', clientList);
    });

    socket.on('roomChat', (roomId, msg) => {
        console.log("\nFrom: " + socket.id + "\nTo: " + roomId + "\nMSG: " + msg + "\n");
        socket.broadcast.to(roomId).emit('chat message', msg);
    });

    socket.on('chat message', msg => {
        console.log(clientName + ': ' + msg);
        io.emit('chat message', clientName + ': ' + msg);
    });
});

http.listen(HTTP_PORT, () => {
    console.log('Listening on: ' + HTTP_PORT);
});