import Game from './my-game';
import GameView from './my-game-view';
import Map from './map';
import GameClient from './game-client';
import io from 'socket.io-client/socket.io';

let socket = io('http://localhost:3000');

let gameClient = new GameClient(socket);

// socket.on('connect', function(){
// });
// socket.on('command', function(data){
//   console.log(data);
// });
// socket.on('disconnect', function(){});

setTimeout(function() {
  socket.emit('command', 'tiddler', true);
}, 5000);

const map = {
  cells: [
    [1, 1, 1, 1 , 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  spawn: [1, 2]
};

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let canvas = document.getElementById('game');
  canvas.height = 600;
  canvas.width = 600;

  // TODO - must be nicer
  //game.map = new Map(map);
  //new GameView(game, canvas);
}, false);
