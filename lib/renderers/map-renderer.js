export default class MapRenderer {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  draw(map) {
    let height = this.height / map.length;
    map.forEach((row, idx) => {
      let y = idx * height;
      let width = this.width / row.length;
      row.forEach((col, idx) => {
        this.drawTile(col, width, height, idx * width, y);
      });
    });
  }

  drawTile(tile, width, height, x, y) {
    this.ctx.fillStyle = tile === 1 ? 'green' : 'red';
    this.ctx.fillRect(x, y, width, height);
  }
}
