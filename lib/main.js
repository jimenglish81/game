import Engine from './engine.js';
import GameView from './game-view.js';

let canvas = document.getElementById('game');
canvas.width = 600;
canvas.height = 600;

let engine = new Engine(null);
new GameView(engine, canvas);
