import _ from 'lodash';
import Vector from './vector';

export default class App {
  constructor() {
    this.vector = new Vector(10, 20);
    this.a = _;
  }
}
