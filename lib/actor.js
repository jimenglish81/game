function Actor(x, y, mass, maxWidth, maxHeight) {
  this.position = new Vector(x, y);
  this.velocity = new Vector(-1, -1);
  this.target = new Vector(0, 0);
  this.mass = mass;
  this.maxWidth = maxWidth;
  this.maxHeight = maxHeight;
  
  this.x = x;
  this.y = y;
}

Actor.prototype.update = function(targetPosition) {
  this.target = targetPosition;

  var velocity = this.velocity;
  var behaviour = wander(this.target, this.position, velocity, Actor.MAX_VELOCITY);

  behaviour = behaviour.scaleBy(1 / this.mass);
  behaviour = behaviour.truncate(Actor.MAX_VELOCITY);

  velocity = velocity.add(behaviour);
  velocity = velocity.truncate(Actor.MAX_VELOCITY);
  this.velocity = velocity;

  this.position = this.position.add(this.velocity);


  this.x = Math.abs(this.position.x % this.maxWidth);
  this.y = Math.abs(this.position.y % this.maxHeight);


};

Actor.MAX_VELOCITY = 5;
