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


/*
//behaviours

function seek(target, position, velocity, max) {      
  var desired = target.subtract(position);
  desired = desired.normalize();
  desired = desired.scaleBy(max);
  
  return desired.subtract(velocity);
}

// TODO
function flee(target, position, velocity, max) {
  var desired = position.subtract(target);
  desired.normalize();
  desired.scaleBy(max);
  
  return desired.subtract(velocity);
}

var wanderAngle = 0;
function wander(target, position, velocity, max) {
  var CIRCLE_DISTANCE = 6;
  var CIRCLE_RADIUS = 3;
  var ANGLE_CHANGE = 1;

  var circleCenter, displacement;
  
  circleCenter = velocity.normalize();
  circleCenter.scaleBy(CIRCLE_DISTANCE);
  
  displacement = new Vector(0, -1);
  displacement.scaleBy(CIRCLE_RADIUS);
  
  displacement = displacement.setAngle(wanderAngle);
  wanderAngle += Math.random() * ANGLE_CHANGE - ANGLE_CHANGE * .5;
  
  return circleCenter.add(displacement);
}

private function pursuit(target, position, velocity, max) {
  var distance = target.subtract(position);
  
  var updatesNeeded distance.magnitude() / max;
  
  var tv = target.clone();
  tv.scaleBy(updatesNeeded);
  
  targetFuturePosition = target.position.clone().add(tv);
  
  return seek(targetFuturePosition);
}
*/
