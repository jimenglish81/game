import assert from './utils/assert';
import StateMachine from './utils/state-machine';
import states from './states';

export default class Game {
  constructor() {
    this.fsm = new StateMachine(this);
    this.fsm.setState(states.menu);
    // start loop.
    this._previous = Date.now();
    this.loop();
  }

  getState() {
    return this.fsm.getState();
  }

  setState(state) {
    // TODO - use store
    this.fsm.setState(states[state]);
    return this;
  }

  setScene(scene) {
    this.scene = scene;
    return this;
  }

  // _addPlayer({ x, y }) {
  //   // assert('spawn' in this.map, 'map must have spawn point.');
  //   // let {x, y} = this.map.spawn;
  //   this.player = {x, y};
  //   this.targetX = x;
  //   this.targetY = y;
  //   this.thrust = 0;
  // }

  getViewport() {
    return this._viewport;
  }

  loop() {
    let viewport = this._viewport;
    // input();
    // game();
    let duration = Date.now() - this._previous;

    // if (this.player) {
    //   let tx = this.targetX - this.player.x;
    //   let ty = this.targetY - this.player.y;
    //   let dist = Math.sqrt(tx*tx+ty*ty);
    //   let rad = Math.atan2(ty,tx);
    //   let angle = rad/Math.PI * 180;
    //
    //   let velX = (tx/dist)*this.thrust;
    //   let velY = (ty/dist)*this.thrust;
    //
    //   if (!isNaN(velX) && !isNaN(velY)) {
    //     this.player.x += velX;
    //     this.player.y += velY;
    //   }
    }

    window.setTimeout(() => this.loop(), 1000 / 60 - duration);
    this._previous = Date.now();
  }
}
