/**
 * State Machine Class.
 */
export default class StateMachine {
  
  /**
   * @param {Object} owner The Object the state machine is managing states for.
   */
  constructor(owner) {
    this.owner = owner;
    this._previousState = null;
    this._state = null;
  }

  /**
   * Returns the current State.
   * 
   * @return {State}
   */
  getState() {
    return this._state;
  }

  /**
   * Sets the current State (alias for changeState).
   * 
   * @param {State} state New state to transition to.
   * @return {StateMachine}
   */
  setState(state) {
    this.changeState(state);
    return this;
  }

  /**
   * Executes the current State.
   * 
   * @return {StateMachine}
   */
  update() {
    if (this._state) {
      this._state.execute(this.owner);
    }

    return this;
  }

  /**
   * Changes to new State by exiting current State if present and entering supplied State.
   *
   * @param {State} state New state to transition to.
   * @return {StateMachine}
   */
  changeState(newState) {
    let currentState = this._state;
    let owner = this.owner;

    if (currentState) {
      this._previousState = currentState;
      currentState.exit(owner);
    }

    this._state = newState;
    if (newState) {
      newState.enter(owner);
    }

    return this;
  }

  /**
   * Revert to previous State, if present.
   *
   * @return {StateMachine}
   */
  revertToPrevious() {
    this.changeState(this._previousState);
    return this;
  }

  /**
   * check if supplied State/id matches current State.
   *
   * @param {String|State} check The value to check.
   * @return {boolean}
   */
  is(check) {
    return this._state.equals(check);
  }
}
