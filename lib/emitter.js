import BackboneEvents from 'backbone-events-standalone';

/**
 * Event Emitter utility.
 */
function Emitter() {}
BackboneEvents.mixin(Emitter.prototype);

export default Emitter;
