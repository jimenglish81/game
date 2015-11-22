import Model from './model';
import Vector from './vector';

export default class Actor extends Model {
  constructor(x=0, y=0, vX=0, vY=0, mass=0) {
    super({
      mass,
      position: new Vector(x, y),
      velocity: new Vector(vX, vY),
    });
  }

  update() {
    let velocity = this.velocity;
    velocity = velocity.truncate(Actor.MAX_VELOCITY);

    this.velocity = velocity;
    this.position = this.position.add(this.velocity);
  }

  static get MAX_VELOCITY() {
    return 5;
  }
}
