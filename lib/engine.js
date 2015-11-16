import assert from './utils/assert';
import states from './engine-states';
import StateMachine from './utils/state-machine';
import Emitter from './utils/emitter';

export default class Engine extends Emitter {
  constructor() {
    super();
    this.run();
  }

  getState() {
    return this.fsm.getCurrentState();
  }

  setState(state) {
    this.fsm.setCurrentState(state);
    this.trigger('state', state.toString());
  }

  run() {
    this.fsm = new StateMachine(this);
    this.setState(states.menu);

    this._previous = Date.now();

    this.loop();
  }

  loop() {
    let duration = Date.now() - this._previous;

    this.fsm.update();
    window.setTimeout(() => this.loop(), 1000 / 60 - duration);
    this._previous = Date.now();
  }
}
