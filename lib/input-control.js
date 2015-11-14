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

  addEvents(element) {
    element.addEventListener('keydown', this._handleKeyPress.bind(this, true), false);
    element.addEventListener('keyup', this._handleKeyPress.bind(this, false), false);
  }

  _handleKeyEvent(isKeyUp, evt) {
    const keys = KEYS.directions;

    switch(evt.keyCode) {
      case keys.up:
        // key  up
      case keys.right:
        // key  right
      case keys.down:
        // key  down
      case keys.left:
        // key  left
        break;
      default:
        return true;
    }
  }
}
