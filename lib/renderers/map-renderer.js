import Renderer from './renderer';

export default class MapRenderer extends Renderer {

  draw(map) {
    let height = this.height / map.cells.length;
    map.cells.forEach((row, idx) => {
      let y = idx * height;
      let width = this.width / row.length;
      row.forEach((col, idx) => {
        this.drawTile(col, width, height, idx * width, y);
      });
    });
  }

  drawTile(tile, width, height, x, y) {
    this.ctx.fillStyle = (tile === 1) ? 'green' : 'red';
    this.ctx.fillRect(x, y, width, height);
  }
}
