export default class GameView {

  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this._init();
  }

  _init() {
    let canvas = this.canvas;
    canvas.tabIndex = 0;
    canvas.focus();
    this.ctx = canvas.getContext('2d');
    this.bounds = canvas.getBoundingClientRect();
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    this._attachEvents();
    this.update();
  }

  _positionFromEvent(evt) {
    const bounds = this.bounds;
    const x = (evt.clientX - bounds.left) * (this.width / bounds.width);
    const y = (evt.clientY - bounds.top)  * (this.height / bounds.height);
    return { x, y };
  }

  _handleClick(evt) {
    const pos = this._positionFromEvent(evt);
  }

  _attachEvents() {
    this.ctx.canvas.addEventListener('click', this._handleClick.bind(this), false);
  }

  drawBackground() {}

  drawFrame() {
    // this.setUpViewport();
    // this.drawBackground();
    // this.drawObjects();
    // this.drawStats();
  }

  drawObjects() {

  }

  setUpViewport() {}

  update() {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    //this.setUpViewport();
    this.drawFrame();
    ctx.restore();
    window.requestAnimationFrame(() => this.update());
  }
}
