import Module from './module.js';
import _ from 'lodash';

export default class App {
  constructor() {
    new Module();
    console.log('elf');
    console.log(_);
  }
}
