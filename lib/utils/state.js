import _ from 'lodash';

export default class State {
  constructor(id) {
    this.id = id;
  }

  enter(owner) {}

  execute(owner) {}

  exit(owner) {}

  handleEvent(owner) {}

  equals(check) {
    return check && this.id === check.id;
  }

  toString() {
    return this.id;
  }

  static build(id, props) {
    return _.assign(new State(id), props);
  }
}
