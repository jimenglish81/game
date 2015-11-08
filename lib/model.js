import Emitter from './emitter';

/**
 * Model class to represent all complex objects.
 * @extends {Emitter}
 */
export default class Model extends Emitter {

  /**
   * @param {Object} [properties] Initial properties.
   */
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

  /**
   * Getter method for Model.
   *
   * @param {string} key Property to get.
   * @return {Object}
   */
  get(key) {
    return this._attrs[key];
  }

  /**
   * Individual setter method for Model.
   *
   * @param {string} key Property to set.
   * @param {Object} value Value to set.
   * @param {boolean} [silent=false] silent Whether events should be published.
   * @return {Model}
   */
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

  /**
   * Multiple setter method for Model.
   *
   * @param {Object} properties Object literal containing changes to set.
   * @param {boolean} [silent=false] silent Whether events should be published.
   * @return {Model}
   */
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

  /**
   * Destroy method by settings properties to 'null' and unsubscribing all events.
   *
   * @return {Model}
   */
  destroy() {
    this.off();
    this._attrs = null;
    return this;
  }
}
