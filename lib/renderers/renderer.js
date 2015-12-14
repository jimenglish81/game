import Emitter from '../utils/emitter';

export default class Renderer extends Emitter {
  constructor(ctx, width, height) {
    super();
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  draw() {
    throw new Error('A renderer must implement a \'draw\' method.');
  }
}
