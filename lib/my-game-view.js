import GameView from './game-view';
import MapRenderer from './renderers/map-renderer';

const map = [
  [1, 1, 1, 1 , 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1]
];

export default class MyGameView extends GameView {

  _init() {
    super._init();
    let {
      ctx,
      height,
      width
    } = this;
    this._mapRenderer = new MapRenderer(ctx, width, height);
  }

  drawBackground() {}

  drawFrame() {
    const currentState = this.game.fsm.getState();
    if (currentState.equals('menu')) {
      this._mapRenderer.draw(map);
    }
  }

  drawObjects() {}

  setUpViewport() {}

}
