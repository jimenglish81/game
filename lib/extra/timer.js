/**
 * Timer Class to be used for animation timing.
 */
export default class Timer() {

  /**
   * Timer contructor.
   */
  constructor() {
    this._previousTick = (new Date()).getTime();
  }

  /**
   * Get seconds passed between ticks.
   */
  getSeconds() {
		return (this._duration / 1000) || 0;
	}

  /**
   * 'Tick' the Timer.
   */
  tick() {
	  const currentTick = (new Date()).getTime();
		this._duration = currentTick - this._previousTick;
	  this._previousTick = currentTick;
	}
};
