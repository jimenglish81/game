/**
 * Tile Class.
 */
export default class MapRenderer {
  constructor(x, y, width, height, ctx) {
    this._height = height;
    this._width = width;
    this._ctx = ctx;
  }

  update() {
    let ctx = this._ctx;
    ctx.fillStyle = 'green';
    ctx.fillRect(
      this._x, this._y,
      this._width, this._height
    );
  }

  drawTile() {

  }
}
