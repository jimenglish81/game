// 2d point in space x, y coordinates.
export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // translates the given point to the supplied.
  translate(point) {
    this.x += point.x;
    this.y += point.y;
  }

  //negate the x and y
  invert() {
    return new Point(-this.x, -this.y);
  }

  //returns copy of point
  clone() {
    return new Point(this.x, this.y);
  }

  // constrains the point within the supplied box dimensions
  constrain(box) {
    const {
      topLeft,
      bottomRight
    } = box;

    if (this.x < topLeft.x) {
      this.x = topLeft.x;
    } else if (this.x > bottomRight.x) {
      this.x = bottomRight.x;
    }

    if (this.y < topLeft.y) {
      this.y = topLeft.y;
    } else if (this.y > bottomRight.y) {
      this.y = bottomRight.y;
    }

    return this;
  }

  // checks if point matches
  equals(point) {
    return this === point ||
        (point && this.x === point.x && this.y === point.y);
  }
}
