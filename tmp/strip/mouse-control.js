import Emitter from './utils/emitter';

export default class MouseControl extends Emitter {

  addEvents(element) {
    element.addEventListener('click', this._handleClick.bind(this), false);
  }

  _handleClick(evt) {
    let {x, y} = evt;

    this.trigger('move', {
      x,
      y
    });
  }
}
