/**
 * Animation Class to store sprite locations.
 */
export default class SpriteAnimation {

  /**
   * @param {Object[]} frames Frames array for animation.
   * @param {SpriteSheet} sprite SpriteSheet to use for the animation.
   */
  constructor(frames, sprite) {
    this._frames = frames;
    this._sprite = sprite;
    this.reset();
  }

  /**
   * @param {number} time Seconds returned from Timer Class.
   * @return {SpriteAnimation}
   */
  animate(time) {
    this._duration -= time;
    if (this._duration <= 0) {
      this._index++;
      if(this._index === this._frames.length) {
        this._index = 0;
      }

      this._duration = this._getCurrentFrame().time;
    }

    return this;
  }

  _getCurrentFrame() {
    return this._frames[this._index];
  }

  /**
   * Name of Sprite within given SpriteSheet.
   *
   * @return {string}
   */
  getSprite() {
    return this._sprite.getOffset(this._getCurrentFrame().sprite);
  }

  /**
   * Resets animation to the beginning.
   *
   * @return {SpriteAnimation}
   */
  reset() {
    this._frameIndex = 0;
    this._duration = this._getCurrentFrame().time;
    return this;
  }

}
