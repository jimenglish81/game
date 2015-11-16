/**
 * ViewPort Class to represent bounding box of Map.
 */
export default class ViewPort {

  /**
   * @param {Vector} topLeft The top left hand corner of the viewport.
   * @param {Vector} bottomRight The bottom right hand corner of the viewport.
   */
  constructor(topLeft, bottomRight) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }
}
