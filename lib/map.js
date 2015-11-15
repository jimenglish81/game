import _ from 'lodash';
import Model from './model';

export default class Map extends Model {
  constructor(properties) {
    super(properties);
    this._init();
  }

  static build({height, width, spawn, squadSize}) {
    return new Map({
      height,
      spawn: Point.build(layout.spawn),
      squadSize,
      tiles,
      width
    });
  }
}
