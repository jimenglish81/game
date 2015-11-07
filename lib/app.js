import _ from 'lodash';
import Vector from './vector';

export default class App {
  constructor() {
    this.vector = new Vector(10, 20);
    console.log(new Vector(1, 2));
    console.log('elf');
    console.log(_);
  }
}
