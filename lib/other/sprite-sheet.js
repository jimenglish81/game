import _ from 'lodash';

/**
 * SpriteSheet Class to store sprite locations.
 */
export default class SpriteSheet {

  /**
   * @param {number} [height Height of each Sprite.
   * @param {number} width Width of each Sprite.
   * @param {number} [frames*] Initial frames to add.
   */
  constructor(height, width, ...frames) {
    this.height = width;
    this.height = width;
    this._frames = [];
    if (frames) {
		    this.addAll(frames);
    }
  }

  /**
   * Add Frame to SpriteSheet.
   *
   * @param {string} name Given name of Sprite.
   * @param {number} [x=0] X coordinate of Sprite.
   * @param {number} [y=0] Y coordinate  of Sprite.
   * @return {SpriteSheet}
   */
  add(name, x=0, y=0) {
    this._frames.push({
      name,
      x,
      y,
    });
    return this;
  }

  /**
   * Add multiple Frame(s) to SpriteSheet.
   *
   * @param {Object[]} [frames=[]] Frames to add to Spritesheet.
   * @return {SpriteSheet}
   */
  addAll(...frames) {
    frames.forEach(({name, x, y}) => this.add(name, x, y));
    return this;
  }

  /**
   * Find a Sprite Frame by its name.
   *
   * @param {string} name Find a Sprite Frame by the given name.
   * @return {Object}
   * @property {string} name The name supplied for the Sprite Frame.
   * @property {number} x X coordinate of Sprite.
   * @property {number} y Y coordinate of Sprite.
   */
  findByName(name) {
    return _.find(this._frames, {name});
	}

  /**
   * Find a Sprite Frames offset by its name.
   *
   * @param {string} name Get offset of a Sprite Frame by the given name.
   * @return {Object}
   * @property {number} x X coordinate of Sprite.
   * @property {number} y Y coordinate of Sprite.
   */
  getOffset(name) {
    const sprite = this.findByName(name);
    return {
      x: sprite.x,
      y: sprite.y
    };
  }
}
