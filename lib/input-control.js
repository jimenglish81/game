import Emitter from './utils/emitter';

const KEYS = {
  directions: {
    up: 38,
    right: 39,
    down: 40,
    left: 37,
  }
};

export default class InputControl extends Emitter {

  constructor() {
    super();
    this.actions = Object.create(null);
  }

  addEvents(element) {
    element.addEventListener('keydown', this._handleKeyPress.bind(this, true), false);
    element.addEventListener('keyup', this._handleKeyPress.bind(this, false), false);
  }

  _handleKeyEvent(isKeyUp, evt) {
    const keys = KEYS.directions;
    //let { actions } = this;

    switch(evt.keyCode) {
      case keys.up:
      case keys.right:
      case keys.down:
      case keys.left:
        this.actions[evt.keyCode] = isKeyUp;
        evt.preventDefault();
        break;
      default:
        return true;
    }
  }
}
