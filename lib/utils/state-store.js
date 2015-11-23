/**
 * A Class to store States.
 */
export default class StateStore {
  
  /**
   * Initialise StateStore.
   */
  constructor() {
    this._states = Object.create(null);
  }
  
  /**
   * Add given State.
   * 
   * @param {State} state State to add.
   * @return {StateStore}
   */
  add(state) {
    this._states[state.id] = state;
    return this;
  }

  /**
   * Add given States.
   * 
   * @param {...State} states States to add.
   * @return {StateStore}
   */
  addAll(...states) {
    states.forEach((state) => this.add(state));
    return this;
  }

  /**
   * Get State by id.
   * 
   * @param {string} id Identifier to retrieve State by.
   * @return {State}
   */
  get(id) {
    return this._states[id];
  }

  /**
   * Remove State by id.
   * 
   * @param {string} id Identifier to remove State by.
   * @return {StateStore}
   */
  remove(id) {
    delete this._states[id];
    return this;
  }
}
