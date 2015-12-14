import GameView from './game-view';
import MapRenderer from './renderers/map-renderer';
import MenuRenderer from './renderers/menu-renderer';

export default class MyGameView extends GameView {

  _init() {
    super._init();
    let {
      ctx,
      height,
      width
    } = this;
    this._mapRenderer = new MapRenderer(ctx, width, height);
    this._menuRenderer = new MenuRenderer(ctx, width, height);
  }

  drawBackground() {}

  drawFrame() {
    const currentState = this.game.fsm.getState();
    if (currentState.equals('menu')) {
      //this._menuRenderer.draw();
    }
    if (currentState.equals('menu')) {
      this._mapRenderer.draw(this.game.map);
    }
  }

  drawObjects() {}

  setUpViewport() {}

}
