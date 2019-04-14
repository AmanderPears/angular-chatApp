const express = require('express');
const app = express();
const path = require('path');

const HTTP_PORT = process.env.PORT || 8080;

const cors = require('cors');

app.use(express.static('public'));
app.use(cors());

var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientList = [];
var socketList = [];

io.on('connection', socket => {
    let tempUserName = 'User-' + Math.floor(Math.random() * 100000 + 1);

    let val = { soc: socket, name: tempUserName };
    clientList.push(val);

    socketList.push(socket.id);

    console.log(tempUserName + ' has connected');
    io.emit('chat message', tempUserName + ' has connected');

    socket.on('disconnect', () => {
        console.log(tempUserName + ' has disconnected');
        io.emit('chat message', tempUserName + ' has disconnected');
    });

    socket.on('chat message', msg => {

        if (msg.startsWith('@User-')) {
            for (var i = 0; i < clientList.length; ++i) {
                if ((msg.split(" "))[0].substring(1) == clientList[i].name) {
                    clientList[i].soc.emit('chat message', 'From ' + tempUserName + ': ' + msg.substring(clientList[i].name.length + 2));
                    break;
                }
            }
        } else {
            console.log(tempUserName + ': ' + msg);
            io.emit('chat message', tempUserName + ': ' + msg);
        }

    });
});

app.get('/socketList', (req, res) => {
    res.json(socketList);
});

http.listen(HTTP_PORT, () => {
    console.log('Listening on: ' + HTTP_PORT);
});