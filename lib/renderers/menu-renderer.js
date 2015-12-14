import Renderer from './renderer';

export default class MenuRenderer extends Renderer {

  draw() {
    this.ctx.fillText('menu', 0, 0);
  }
}
