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

    chai.assert.throw(() => vector.length = 10, 'Cannot set the length of a Vector: 10');
  });

  it('can add a scalar', () => {
    let vector = new Vector(10, 10);
    let newVector = vector.add(10);

    chai.assert.equal(newVector.x, 20);
    chai.assert.equal(newVector.y, 20);
  });
});
