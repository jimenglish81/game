export default class Map {
  constructor(config) {
    this.config = config;
    this.entities = [];
    this.spawn = null;
    this._populate(config);
  }

  _populate(config) {
    this.cells = config.cells.slice();
    // spawn new point
    return config;
  }

  getCell(x, y) {
    return this.cells[y][x];
  }
}
