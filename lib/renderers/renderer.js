import Emitter from '../utils/emitter';

export default class Renderer extends Emitter {

  constructor() {
    super();
  }

  handleKeyAction(key, isKeyUp) {}

  render(ctx, engine) {}
}
