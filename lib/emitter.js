import BackboneEvents from 'backbone-events-standalone';

/**
 * Event Emitter.
 */
function Emitter() {}
BackboneEvents.mixin(Emitter.prototype);

export default Emitter;
