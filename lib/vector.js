/**
 * Vector Class to represent a coordinate vector.
 */
export default class Vector {

  /**
   * @param {number} [x=0] Horizontal position.
   * @param {number} [y=0] Vertical position.
   */
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }

 /**
  * @type {number} length - magnitude of Vector.
  */
  get length() {
    return Math.sqrt(this.dot(this));
  }

  /**
   * @throws {Error} Read only.
   */
  set length(l) {
    throw new Error('Cannot set the length of a Vector to ' + l);
  }

  /**
   * Adds the given scalar to Vector.
   *
   * @param {number} scalar
   * @return {Vector}
   */
  add(scalar) {
    return new Vector(this.x + scalar, this.y + scalar);
  }

  /**
   * Clones the Vector.
   *
   * @return {Vector}
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * Distance between this and given Vector.
   *
   * @param {Vector} vector
   * @return {Vector}
   */
  distance(vector) {
    return this.subtract(vector).length;
  }

  /**
   * Divides the given scalar from Vector.
   *
   * @param {number} scalar
   * @return {Vector}
   */
  divide(scalar) {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  /**
   * Dot product of this and the supplied Vector.
   *
   * @param {Vector} vector
   * @return {number}
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Divides the given scalar from Vector.
   *
   * @param {Vector} vector
   * @return {boolean}
   */
  equal(vector) {
    return this.x === vector.x && this.y === vector.y;
  }

  /**
   * Calculates the angle from Vector.
   *
   * @return {number}
   */
  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Multiplies the Vector by the given scalar.
   *
   * @param {number} scalar
   * @return {Vector}
   */
  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  /**
   * Normalizes the Vector, so that it has a length of 1.
   * If the length is 0 then it will remain 0.
   *
   * @return {Vector}
   */
  normalize() {
    const magnitude = this.length;
    let vector = new Vector(0, 0);

    if (magnitude) {
      vector.x = this.x / magnitude;
      vector.y = this.y / magnitude;
    }

    return vector;
  }

  /**
   * Adjust the Vector to match the given angle.
   *
   * @param {number} value
   * @return {Vector}
   */
  setAngle(value) {
    const magnitude = this.length;
    let vector = this.clone();

    vector.x = Math.cos(value) * magnitude;
    vector.y = Math.sin(value) * magnitude;

    return vector;
  }

  /**
   * Subtracts the given scalar from the Vector.
   *
   * @param {number} scalar
   * @return {Vector}
   */
  subtract(scalar) {
    return new Vector(this.x - scalar, this.y - scalar);
  }

  /**
   * Truncates Vector by the given scalar.
   *
   * @param {number} max
   * @return {Vector}
   */
  truncate(max) {
    let i = Math.min(max / this.length, 1);

    return this.multiply(i);
  }

  /**
   * JSON representation of the Vector.
   *
   * @return {string}
   */
  toJSON() {
    let {x, y} = this;

    return JSON.stringify({x, y});
  }

  /**
   * String representation of the Vector.
   *
   * @return {string}
   */
  toString() {
    return `(${this.x},${this.y})`;
  }

  static build({x, y}) {
    return new Vector(x, y);
  }
}
