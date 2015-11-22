import Game from './game';
import states from './states';

export default class MyGame extends Game {
  constructor() {
    super('menu', states);
  }

  loop() {
    super.loop();
  }
}
