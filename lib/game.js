export default class Game {
  constructor(player, worldSize=500) {
    this._player = player;
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
