import StateMachine from './utils/state-machine';
import states from './states';

export default class Game {
  constructor() {
    this.fsm = new StateMachine(this);
    this._previous = Date.now();
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
