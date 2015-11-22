import StateMachine from './utils/state-machine';

export default class Game {
  constructor(initialState, stateStore) {
    this.fsm = new StateMachine(this);
    this.fsm.setState(stateStore.get(initialState));
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
