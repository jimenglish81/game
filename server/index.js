'use strict';

import GameServer from './game-server';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let api = express.Router();
let gameServer = new GameServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes.js')(api);
app.use('/api', api);

let server = app.listen(3000, () => {
  let io = require('socket.io')(server);
  gameServer.addSocket(io);
  // io.on('connection', function(socket) {
  //   socket.broadcast.emit('hi');
  //   socket.on('command', function(msg) {
  //     console.log('command: ' + msg);
  //     io.emit('command', msg);
  //   });
  //});
});
