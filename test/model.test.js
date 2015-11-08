import Model from '../lib/model';

describe('Model', () => {
  it('can be constructed with properties', () => {
    let model = new Model({
      bar: false,
      foo: true
    });

    chai.assert.equal(model.get('bar'), false);
    chai.assert.equal(model.get('foo'), true);
  });

  it('can set individual properties', () => {
    let model = new Model();

    model.set('bar', true);
    chai.assert.equal(model.get('bar'), true);
  });

  it('can set mutliple properties', () => {
    let model = new Model();

    model.setProperties({
      bar: true,
      foo: true
    });

    chai.assert.equal(model.get('bar'), true);
    chai.assert.equal(model.get('foo'), true);
  });

  it('can be observed on individual change', () => {
    let model = new Model({
      bar: false
    });
    let barSpy = sinon.spy();
    let changeSpy = sinon.spy();

    model.on('bar', barSpy);
    model.on('change', changeSpy);
    model.set('bar', true);

    chai.assert(barSpy.calledOnce, '\'bar\' handler should be called once.');
    chai.assert(barSpy.calledWith(true), '\'bar\' handler should be called with \'true\'.');
    chai.assert(changeSpy.calledOnce, '\'change\' handler should be called once.');
    chai.assert.equal(changeSpy.args[0][0].bar, true, '\'bar\' handler should be called with \'{ bar: true }\'.');

    model.set('bar', true);
    chai.assert(barSpy.calledOnce, '\'bar\' handler should be called once after a set with the same value');
    chai.assert(changeSpy.calledOnce, '\'change\' handler should be called once after a set with the same value');
  });

  it('can be observed on multiple change', () => {
    let model = new Model({
      bar: false,
      foo: true,
      qux: false
    });
    let barSpy = sinon.spy();
    let fooSpy = sinon.spy();
    let changeSpy = sinon.spy();

    model.on('bar', barSpy);
    model.on('foo', fooSpy);
    model.on('change', changeSpy);
    model.setProperties({
      bar: true,
      foo: true
    });

    chai.assert(barSpy.calledOnce, '\'bar\' handler should be called once.');
    chai.assert(barSpy.calledWith(true), '\'bar\' handler should be called with \'true\'.');
    chai.assert(fooSpy.notCalled, '\'foo\' handler should not be called.');
    chai.assert(changeSpy.calledOnce, '\'change\' handler should be called once.');
    chai.assert.equal(changeSpy.args[0][0].bar, true, '\'bar\' handler should be called with \'{ bar: true }\'.');
  });

  it('can be destroyed', () => {
    let model = new Model({
      foo: true
    });

    model.destroy();
    chai.assert.throw(() => model.set('foo', false));
  });
});
