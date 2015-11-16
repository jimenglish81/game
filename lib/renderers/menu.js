import Renderer from './renderer';
import InputControl from '../input-control';
import { minmax } from '../utils/minmax';

const menuItems = [
  {
    label: 'start game',
    command: 'start',
  },
  {
    label: 'something else',
    command: 'stop',
  }
];

/**
 * Tile Class.
 */
export default class MenuRenderer extends Renderer {

  constructor() {
    super();
    this._menuItems = menuItems;
    this._selectedIndex = 0;
  }

  handleKeyAction(key, isKeyUp) {
    const keys = InputControl.KEY_NAMES;
    let selected = this._selectedIndex;

    switch(key) {
      case keys.N:
        selected--;
        break;
      case keys.S:
        selected++;
        break;
      case keys.ENTER:
        if (!isKeyUp) {
          this.trigger('start');
        }
        break;
      default:
    }
    this._selectedIndex = minmax(selected, 0, this._menuItems.length - 1);
  }

  render(ctx, engine) {
    const height = ctx.canvas.height;
    const width = ctx.canvas.width;
    const centerX = width / 2;
    const centerY = height / 2;
    const selected = this._selectedIndex;

    this._menuItems.forEach((item, i) => {
      ctx.fillText(`${item.label} ${selected === i}`, centerX - 30, centerY + (30 * i));
    });
  }
}
