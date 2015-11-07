import Vector from '../lib/vector';

describe('Vector', () => {
  it('sets x and y', () => {
    let vector = new Vector(10, 20);

    chai.assert.equal(vector.x, 10);
    chai.assert.equal(vector.y, 20);
  });

  it('has a length', () => {
    let vector = new Vector(10, 10);

    chai.assert.closeTo(vector.length, 14.14, 0.1);
  });

  it('throws when setting length', () => {
    let vector = new Vector(10, 10);

    chai.assert.throw(() => vector.length = 10, 'Cannot set the length of a Vector to 10');
  });

  it('can add a scalar', () => {
    let vector = new Vector(10, 10);
    let newVector = vector.add(10);

    chai.assert.equal(newVector.x, 20);
    chai.assert.equal(newVector.y, 20);
  });

  it('can be cloned', () => {
    let vector = new Vector(10, 10);
    let newVector = vector.clone();

    chai.assert.equal(newVector.x, 10);
    chai.assert.equal(newVector.y, 10);
    chai.assert.notEqual(vector, newVector);
  });

  it('computes its dot product', () => {
    let vector = new Vector(10, 10);

    chai.assert.equal(vector.dot(new Vector(20, 20)), 400);
  });

  it('can divide a scalar', () => {
    let vector = new Vector(10, 10);
    let newVector = vector.divide(10);

    chai.assert.equal(newVector.x, 1);
    chai.assert.equal(newVector.y, 1);
  });

  it('equals an equivalent vector', () => {
    let vector = new Vector(10, 10);
    let otherVector =  new Vector(10, 10);

    chai.assert.isTrue(vector.equal(otherVector));
  });

  it('computes its angle', () => {
    let vector = new Vector(10, 20);

    chai.assert.closeTo(vector.getAngle(), 1.10, 0.1);
  });

  it('computes its magnitude', () => {
    let vector = new Vector(10, 20);

    chai.assert.closeTo(vector.magnitude(), 22.36, 0.1);
  });

  it('can multiply a scalar', () => {
    let vector = new Vector(10, 10);
    let newVector = vector.multiply(10);

    chai.assert.equal(newVector.x, 100);
    chai.assert.equal(newVector.y, 100);
  });

  it('can be normalized', () => {
    let vector = new Vector(10, 20);
    let newVector = vector.normalize();

    chai.assert.closeTo(newVector.x, 0.44, 0.01);
    chai.assert.closeTo(newVector.y, 0.89, 0.01);
  });

  it('can set its angle', () => {
    let vector = new Vector(10, 20);
    let newVector = vector.setAngle(30);

    chai.assert.closeTo(newVector.x, 3.44, 0.01);
    chai.assert.closeTo(newVector.y, -22.09, 0.01);
  });

  it('can subtract a scalar', () => {
    let vector = new Vector(10, 10);
    let newVector = vector.subtract(10);

    chai.assert.equal(newVector.x, 0);
    chai.assert.equal(newVector.y, 0);
  });

  it('can be truncated', () => {
    let vector = new Vector(10, 20);
    let newVector = vector.truncate(10);

    chai.assert.closeTo(newVector.x, 4.47, 0.01);
    chai.assert.closeTo(newVector.y, 8.94, 0.01);
  });

  it('can be stringified', () => {
    let vector = new Vector(10, 20);

    chai.assert.equal(vector.toString(), '(10,20)');
  });

  it('can be serialized', () => {
    let vector = new Vector(10, 20);

    chai.assert.equal(vector.toJSON(), JSON.stringify({ x: 10 , y: 20 }));
  });
});
