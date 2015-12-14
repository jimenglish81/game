import _ from 'lodash';
import Point from './point';

const config = {
  tileSize: {
    'x': 64,
    'y': 64
  }
}

export default class Map {
  constructor(data) {
    this._mapData = data;
    this.entities = [];
    this._populate(data);
  }

  _populate(data) {
    const [spawnX, spawnY] = data.spawn;
    this.numXTiles = data.width;
    this.numYTiles = data.height;
    this.tileSize = new Point(data.tilewidth, data.tileheight);
    this.pixelSize = new Point(this.numXTiles * this.tileSize.x,
                        this.numYTiles * this.tileSize.y);

    this.spawn = new Point(spawnX, spawnY);
    this.tileSets = data.tilesets.map((tileSet) => {
      let {
        firstgid,
        image,
        imageheight,
        imagewidth,
        name
      } = tileSet;

      return {
        firstgid,
        image,
        imageheight,
        imagewidth,
        name,
        numXTiles: Math.floor(imagewidth / this.tileSize.x),
        numYTiles: Math.floor(imageheight / this.tileSize.y)
      };
    });

    this.entites = []; // TODO
  }

  getTile(index) {
    let tileSet = _.find(this.tileSets, (tileSet) => tileSet.firstgid <= index);

    if (tileSet) {
      let localIdx = index - tileSet.firstgid;
      let lTileX = Math.floor(localIdx % tileSet.numXTiles);
      let lTileY = Math.floor(localIdx / tileSet.numXTiles);

      return {
        image: tileSet.image,
        px: lTileX * this.tileSize.x,
        py: lTileY * this.tileSize.y
      }
    }
    return null;
  }
}
