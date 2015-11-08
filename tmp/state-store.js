define(function(require) {
   var State = require('state');

   function StateStore() {
      this._states = {};
   }
   var prototype = StateStore.prototype;

   prototype._states = null;

   prototype.set = function(id, props) {
      this._states[id] = State.build(id, props);
      return this;
   };

   prototype.get = function(id) {
      return this._states[id];
   };

   return StateStore;
});
