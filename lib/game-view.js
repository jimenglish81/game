import AssetLoader from './asset-loader';
import Emitter from './emitter';

export default class GameView extends Emitter() {

  constructor(game, canvas, assetLoader=new AssetLoader()) {
    super();
    this._game = game;
    // focus canvas and give it a tab index.
    canvas.tabIndex = 0;
    canvas.focus();
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
  }

  drawBackground() {

  }

  drawFrame() {

  }

  drawObjects() {

  }

  setUpViewport() {
    let viewport = this._game.getViewport();
  }
}
