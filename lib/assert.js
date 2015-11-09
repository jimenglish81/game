/**
 * Utility for asserting conditional statements.
 */
export function assert(condition, message){
	if (!condition) {
    throw new Error(`Assert failed: ${message}`);
  }
}
