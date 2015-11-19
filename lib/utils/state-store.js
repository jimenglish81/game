export default class StateStore {
  constructor() {
    this._states = Object.create(null);
  }

  add(state) {
    this._states[state.id] = state;
    return this;
  }

  addAll(...states) {
    states.forEach((state) => this.add(state));
    return this;
  }

  get(id) {
    return this._states[id];
  }

  remove(id) {
    delete this._states[id];
    return this;
  }
}
