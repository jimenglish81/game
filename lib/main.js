import Game from './my-game';
import GameView from './my-game-view';

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let canvas = document.getElementById('game');
  canvas.height = 600;
  canvas.width = 600;

  let game = new Game();
  new GameView(game, canvas);
}, false);
