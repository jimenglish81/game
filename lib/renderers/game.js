import Emitter from '../utils/emitter';
import InputControl from '../input-control';

/**
 * Tile Class.
 */
export default class GameRenderer extends Emitter {

  constructor() {
    super();
  }

  render(ctx) {
    ctx.fillText('playing', 30, 30);
  }
}
