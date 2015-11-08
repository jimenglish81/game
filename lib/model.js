import Emitter from './emitter';

export default class Model extends Emitter {
  constructor(properties) {
    super();

    this._attrs = Object.create(null);
    if (properties) {
      this.setProperties(properties, true);
    }
  }

  _notifyChanges(changes) {
    for (let key in changes) {
      if (changes.hasOwnProperty(key)) {
        const value = changes[key];
        this.trigger(key, value);
      }
    }

    this.trigger('change', changes);
  }

  get(key) {
    return this._attrs[key];
  }

  set(key, value, silent=false) {
    const oldValue = this.get(key);
    let changes = {
      [key]: value
    };
    this._attrs[key] = value;
    if (!silent && oldValue !== value) {
      this._notifyChanges(changes);
    }

    return this;
  }

  setProperties(properties, silent=false) {
    for (let key in properties) {
      let oldValue = this.get(key);
      this.set(key, properties[key], true);
      if (properties[key] === oldValue) {
        delete properties[key];
      }
    }

    if (!silent) {
      this._notifyChanges(properties);
    }

    return this;
  }

  destroy() {
    this.off();
    this._attrs = null;
  }
}
