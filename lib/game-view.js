import Emitter from './utils/emitter';
import InputControl from './input-control';
import MenuRenderer from './renderers/menu';
import GameRenderer from './renderers/game';

let menuRenderer = new MenuRenderer();
let gameRenderer = new GameRenderer();

export default class GameView extends Emitter {

  constructor(engine, canvas) {
    super();
    this.engine = engine;
    this.listenTo(engine, 'state', this._handleStateChange);
    this._selectRenderer(engine.getState());
    // focus canvas and give it a tab index.
    canvas.tabIndex = 0;
    canvas.focus();
    this._ctx = canvas.getContext('2d');
    this._inputControl = new InputControl(this);
    this._inputControl.addEvents(canvas);
    this.update();
  }


  handleKeyAction(key, isKeyUp) {
    this.renderer.handleKeyAction(...arguments);
  }

  _handleRendererEvent(cmd) {
    console.log(cmd);
    this.engine.isPlaying = true;
  }

  _selectRenderer(state) {
    let oldRenderer = this.renderer;
    let chk = state.toString();
    let renderer;
    if (oldRenderer) {
      this.stopListening(oldRenderer);
    }

    switch(state.toString()) {
      case 'menu':
        renderer = menuRenderer;
        break;
      case 'playing':
        renderer = gameRenderer;
        break;
      default:
        renderer = menuRenderer;
    }

    this.renderer = renderer;
    this.listenTo(renderer, 'all', this._handleRendererEvent);
  }

  _handleStateChange(state) {
    this._selectRenderer(state);
  }

  render() {
    this.renderer.render(this._ctx);
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
    //this.setUpViewport();
    this.render();
    this._ctx.restore();
    window.requestAnimationFrame(() => this.update());
  }
}
