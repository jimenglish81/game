export default class StateStore {
  constructor() {
    this._states = Object.create(null);
  }

  get(id) {
    return this._states[id];
  }

  set(state) {
    this._states[state.id] = state;
    return this;
  }
}
