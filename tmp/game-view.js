import Emitter from './utils/emitter';
import MouseControl from './mouse-control';

export default class GameView extends Emitter {

  constructor(game, canvas) {
    super();
    this._game = game;
    // focus canvas and give it a tab index.
    canvas.tabIndex = 0;
    canvas.focus();
    this._ctx = canvas.getContext('2d');
    this._control = new MouseControl();
    this._control.addEvents(canvas);
    this.update();
  }

  drawBackground() {
    this._ctx.fillStyle = 'green';
    this._ctx.fillRect(
      -this._game._viewSize, -this._game._viewSize,
      200, 200
    );

    this._ctx.fillStyle = 'red';
    this._ctx.fillRect(
      0 , 0,
      200, 200
    );
  }

  drawFrame() {

  }

  drawObjects() {

  }

  setUpViewport() {
    const height = this._ctx.canvas.height;
    const width = this._ctx.canvas.width;
    const viewSize = Math.max(width, height);
    let viewport = this._game.getViewport();

    // this will make point 0,0 in center of the canvas
    this._ctx.translate(width / 2, height / 2);

    // zoom to fit viewport size in canvas
    this._ctx.scale(viewSize / this._game._viewSize,
      viewSize / this._game._viewSize);

    // -center will make object at viewport center drawn at 0,0 = scrolling of viewport
    this._ctx.translate(-viewport.x, -viewport.y);
  }

  update() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    this._ctx.save();
    this.setUpViewport();
    this.drawBackground();
    this._ctx.restore();
    window.requestAnimationFrame(() => this.update());
  }
}
