// 2d box in space made from points.
class Box() {
  constructor(topLeft, bottomRight) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }

  // point to represent bottomRight corner relative to topLeft corner
  getDimensions() {
    return new Point(this.bottomRight.x - this.topLeft.x, this.bottomRight.y - this.topLeft.y);
  }

  // returns copy of box\
  clone() {
    return new Box(this.topLeft.clone(), this.bottomRight.clone());
  }

  // gets point torepresent top right
  getTopRight() {
    return new Point(this.bottomRight.x, this.topLeft.y);
  }

  // gets point to represent bottom left
  getBottomLeft() {
    return new Point(this.topLeft.x, this.bottomRight.y);
  }

  // translates the box by given vector
  translate(vector) {
    this.topLeft.translate(vector);
    this.bottomRight.translate(vector); // mutate?
  }

  // scales the box by given scalar
  scale(x, y) {
    this.topLeft.x *= x;
    this.bottomRight.x *= x;

    this.topLeft.y *= y;
    this.bottomRight.y *= y;
  }

  // connstrains box to fit wwithin supplied box.
  constrain(box) {
    this.topLeft.constrain(box);
    this.bottomRight.constrain(box);
    return this;
  }

  // checks whether given point sits within box
  contains(point) {
    const {
      topLeft,
      bottomRight
    } = this;

    return !(point.x < topLeft.x || point.x > bottomRight.x || point.y < topLeft.y || point.y > bottomRight.y);
  }

  // checks whether given box intersects with this box.
  intersects(box) {
    const {
      topLeft,
      bottomRight
    } = this;

    return (topLeft.x < box.bottomRight.x && box.topLeft.x < bottomRight.x &&
      topLeft.y < box.bottomRight.y && box.topLeft.y < bottomRight.y);
  }
}
