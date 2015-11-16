export default class Game {
  constructor() {
    // start loop.
    this._previous = Date.now();
    this.scenes;
    this.loop();
  }

  loop() {
    // input();
    // game();
    let duration = Date.now() - this._previous;

    window.setTimeout(() => this.loop(), 1000 / 60 - duration);
    this._previous = Date.now();
  }
}
