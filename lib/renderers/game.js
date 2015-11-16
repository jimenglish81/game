import Renderer from './renderer';
import InputControl from '../input-control';

/**
 * Tile Class.
 */
export default class GameRenderer extends Renderer {

  constructor() {
    super();
  }

  setUpViewport() {
    const height = this._ctx.canvas.height;
    const width = this._ctx.canvas.width;
    const viewSize = Math.max(width, height);
    let viewport = this._engine.getViewport();

    // this will make point 0,0 in center of the canvas
    this._ctx.translate(width / 2, height / 2);

    // zoom to fit viewport size in canvas
    this._ctx.scale(viewSize / viewport.viewSize,
      viewSize / viewport.viewSize);

    // -center will make object at viewport center drawn at 0,0 = scrolling of viewport
    this._ctx.translate(-viewport.x, -viewport.y);
  }

  render(ctx, engine) {
    this._ctx = ctx;
    this._engine = engine;
    engine.setUpViewport();
  }
}
