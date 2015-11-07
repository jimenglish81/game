
/*
$(function() {

  var canvas = $('<canvas />').appendTo('body');
  var context = canvas[0].getContext('2d');
  canvas[0].width = 800;
  canvas[0].height = 600;

  var actor = new Actor(20, 30, 2, canvas.width(), canvas.height());
  var targetPosition = new Vector(0, 0);

  var RADIUS = 10;
  var FILL_STYLE = '#ff0000';
  var TARGET_FILL_STYLE = '#0000ff';

  canvas.on('mousemove', function(evt) {
    targetPosition = new Vector(evt.pageX, evt.pageY);
  });

  function update() {
    actor.update(targetPosition);
    setTimeout(update, 1000 / 60);
  }

  update();

  function render() {
    // clear canvas
    canvas[0].width = 800;

    // render actor
    context.beginPath();
    context.fillStyle = FILL_STYLE;
    context.arc(actor.x, actor.y, RADIUS, 0, 2 * Math.PI);
    context.fill();
    context.closePath();

    // render target
    context.beginPath();
    context.fillStyle = TARGET_FILL_STYLE;
    context.arc(actor.target.x, actor.target.y, RADIUS, 0, 2 * Math.PI);
    context.fill();
    context.closePath();

    requestAnimationFrame(render);
  }

  render();

});
*/
