export default class StateMachine {
  constructor(owner) {
    this.owner = owner;
    this._previousState = null;
    this._currentState = null;
  }

  getCurrentState() {
    return this._currentState;
  }

  setCurrentState(state) {
    this.changeState(state);
    return this;
  }

  update() {
    if(this._currentState) {
      this._currentState.execute(this.owner);
    }

    return this;
  }

  changeState(newState) {
    let currentState = this._currentState;
    let owner = this.owner;

    if (currentState) {
      this._previousState = currentState;
      currentState.exit(owner);
    }

    this._currentState = newState;
    this._currentState.enter(owner);

    return this;
  }

  revertToPrevious() {
    this.changeState(this._previousState);
    return this;
  };

  isInState(check) {
    return this._currentState.equals(check);
  }
}
