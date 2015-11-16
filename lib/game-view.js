export default class GameView {

  constructor(game, canvas) {
    this.game = game;
    // focus canvas and give it a tab index.
    canvas.tabIndex = 0;
    canvas.focus();
    this.ctx = canvas.getContext('2d');
    this.update();
  }

  drawBackground() {

  }

  drawFrame() {

  }

  drawObjects() {

  }

  setUpViewport() {
    //let viewport = this._game.getViewport();
  }

  update() {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    //this.setUpViewport();
    ctx.restore();
    window.requestAnimationFrame(() => this.update());
  }
}
