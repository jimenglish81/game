efine(function(require) {
   function StateMachine(owner) {
   	this._owner = owner;
   }
   var prototype = StateMachine.prototype;

   prototype._currentState = null;

   prototype._globalState = null;

   prototype._previousState = null;

   prototype._owner = null;

   prototype.setCurrentState = function(state) {
   	this._currentState = state;
   	return this;
   };

   prototype.setGlobalState = function(state) {
   	this._globalState = state;
   	return this;
   };

   prototype.setPreviousState = function(state) {
   	this._previousState = state;
   	return this;
   };

   prototype.getCurrentState = function() {
   	return this._currentState;
   };

   prototype.getGlobalState = function() {
   	return this._globalState;
   };

   prototype.getPreviousState = function() {
   	return this._previousState;
   };

   prototype.update = function() {
   	var owner = this._owner;

   	if(this._globalState) {
   		this._globalState.execute(owner);
   	}
   	if(this._currentState) {
   		this._currentState.execute(owner);
   	}
   	return this;
   };

   prototype.handleEvent = function(event) {
      if (this._currentState) {
         this._currentState.handleEvent(event);
         return true;
      }
      if (this._globalState) {
         this._globalState.handleEvent(event);
         return true;
      }
      return false;
   };

   prototype.changeState = function(newState) {
   	var currentState = this._currentState,
   		owner = this._owner;
		if (currentState) {
   	   this._previousState = currentState;
   	   currentState.exit(owner);
	   }
   	this._currentState = newState;
   	this._currentState.enter(owner);

   	return this;
   };

   prototype.revertToPrevious = function() {
   	this.changeState(this._previousState);
   	return this;
   };

   prototype.isInState = function(check) {
   	return this._currentState.equals(check);
   };

   return StateMachine;
});
