export default class Player {
  constructor(socket) {
    this.socket = socket;
    this.id = client.id;

    // state of keys pressed
    this.left = false
    this.right = false
    this.accelerate = false
    this.shoot = false
  }

  frame(duration_s) {
    if (this.left) {
      // I allow framerate variability, so magnitude of action is multiplied by time
      // this could be even more precise (but complicated) if duration_s was calculated from client's time
      this.ship.rotate(-1 * duration_s);
    }
    if (this.right) {
      this.ship.rotate(1 * duration_s);
    }
    if (this.accelerate) {
      this.ship.accelerate(duration_s);
    }
    if (this.shoot) {
      this.ship.shoot();
    }
  }

  destroy() {

  }

}
