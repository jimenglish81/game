import Game from './game.js';
import GameView from './game-view.js';

let canvas = document.getElementById('game');
canvas.width = 600;
canvas.height = 600;

let game = new Game();
new GameView(game, canvas);
