import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));
const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

const SocketServer = new Server(server);

let log = [];
SocketServer.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    console.log(data);
    log.push(data);
    SocketServer.emit('log', log);
  });
});
