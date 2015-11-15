import assert from './utils/assert';

export default class Game {
  constructor(map) {
    this.map = map;
    this.paused = false;
    this._addPlayer();
    let worldSize = 500;
    this._worldSize = worldSize;
    this._viewSize = worldSize * 0.6;
    this._viewport = {
      x: 0,
      y: 0,
      vx: 1,
      vy: 1
    };
    // start loop.
    this._previous = Date.now();
    this.loop();
  }

  _addPlayer() {
    assert('spawn' in this.map, 'map must have spawn point.');
    let {x, y} = this.map.spawn;


  }

  getViewport() {
    return this._viewport;
  }

  loop() {
    let viewport = this._viewport;
    // input();
    // game();
    let duration = Date.now() - this._previous;
    viewport.x += viewport.vx;
    viewport.y += viewport.vy;

    window.setTimeout(() => this.loop(), 1000 / 60 - duration);
    this._previous = Date.now();
  }
}
