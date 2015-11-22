import StateStore from '../lib/utils/state-store';

describe('StateStore', () => {
  it('can add a state to the store', () => {
    const state = {
      id: 'foo'
    };
    const store = new StateStore();
    store.add(state);

    chai.assert.equal(store.get('foo'), state);
  });

  it('can add multiple states to the store', () => {
    const stateA = {
      id: 'foo'
    };
    const stateB = {
      id: 'bar'
    };
    const store = new StateStore();
    store.addAll(stateA, stateB);

    chai.assert.equal(store.get('foo'), stateA);
    chai.assert.equal(store.get('bar'), stateB);
  });

  it('can add multiple states to the store', () => {
    const stateA = {
      id: 'foo'
    };
    const stateB = {
      id: 'bar'
    };
    const store = new StateStore();
    store.addAll(stateA, stateB);

    chai.assert.equal(store.get('foo'), stateA);
    chai.assert.equal(store.get('bar'), stateB);
  });
});
