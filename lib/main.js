import Game from './game';
import GameView from './game-view';

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('game');
  canvas.height = 600;
  canvas.width = 600;

  let game = new Game();
  new GameView(game, canvas);
}, false);
