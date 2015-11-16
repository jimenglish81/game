export default class InputControl {

  constructor(gameView) {
    this._gameView = gameView;
  }

  addEvents(element) {
    element.addEventListener('keydown', this._handleKeyEvent.bind(this, true), false);
    element.addEventListener('keyup', this._handleKeyEvent.bind(this, false), false);
  }

  _handleKeyEvent(isKeyUp, evt) {
    const key = InputControl.KEYS[evt.keyCode];
    if (evt) {
      evt.preventDefault();
      this._gameView.handleKeyAction(key, isKeyUp);
    }
  }

  static get KEY_NAMES() {
    return {
      N: 'N',
      E: 'E',
      S: 'S',
      W: 'W',
      ENTER: 'ENTER',
    }
  }
  static get KEYS() {
    const keyNames = InputControl.KEY_NAMES;
    return {
      38: keyNames.N,
      39: keyNames.E,
      40: keyNames.S,
      37: keyNames.W,
      13: keyNames.ENTER,
    }
  }
}
