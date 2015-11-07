export default class Vector {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.dot(this));
  }

  set length(l) {
    throw new Error('Cannot set the length of a Vector to ' + l);
  }

  /*
   * Adds the given scalar to vector.
   * @param {String} scalar
   * @return {Vector}
   */
  add(scalar) {
    return new Vector(this.x + scalar, this.y + scalar);
  }

  /*
   * Clones the vector.
   * @return {Vector}
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  divide(scalar) {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  equal(vector) {
    return this.x === vector.x && this.y === vector.y;
  }

  /*
   * Calculates the angle from vector.
   * @return {Vector}
   */
  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  normalize() {
    const magnitude = this.magnitude();
    let vector = new Vector(0, 0);

    if (magnitude) {
      vector.x = this.x / magnitude;
      vector.y = this.y / magnitude;
    }

    return vector;
  }

  setAngle(value) {
    const magnitude = this.magnitude();
    let vector = this.clone();

    vector.x = Math.cos(value) * magnitude;
    vector.y = Math.sin(value) * magnitude;

    return vector;
  }

  subtract(scalar) {
    return new Vector(this.x - scalar, this.y - scalar);
  }

  truncate(max) {
    let i = Math.min(max / this.magnitude(), 1);

    return this.multiply(i);
  }

  toJSON() {
    let { x, y } = this;
    return JSON.stringify({ x, y });
  }

  toString() {
    return `(${this.x},${this.y})`;
  }
}
