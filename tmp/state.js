define(function(require) {
   var utils = require('utils');

   function State(id) {
   	this.id = id;
   }
   var prototype = State.prototype;

   prototype.id = null;

   prototype.enter = function(owner) {};

   prototype.execute = function(owner) {};

   prototype.exit = function(owner) {};

   prototype.handleEvent = function(event) {};

   prototype.equals = function(check) {
   	return check && this.id === check.id;
   };

   State.build = function(id, props) {
      var state = new State(id);
      utils.applyTo(state, props);
      return state;
   };

   return State;
});
