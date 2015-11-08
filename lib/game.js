export default class Game() {
  constructor() {
    // start loop.
    this._previous = Date.now();
  }

  loop() {
    // input();
    // game();
    let duration = Date.now() - previous;

    setTimeout(() => this._loop(), 1000 / 60 - duration);
    this._previous = Date.now();
  }
}
