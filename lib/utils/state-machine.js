export default class StateMachine {
  constructor(owner) {
    this.owner = owner;
    this._previousState = null;
    this._state = null;
  }

  getState() {
    return this._state;
  }

  setState(state) {
    this.changeState(state);
    return this;
  }

  update() {
    if(this._state) {
      this._state.execute(this.owner);
    }

    return this;
  }

  changeState(newState) {
    let currentState = this._state;
    let owner = this.owner;

    if (currentState) {
      this._previousState = currentState;
      currentState.exit(owner);
    }

    this._state = newState;
    this._state.enter(owner);

    return this;
  }

  revertToPrevious() {
    this.changeState(this._previousState);
    return this;
  };

  is(check) {
    return this._state.equals(check);
  }
}
