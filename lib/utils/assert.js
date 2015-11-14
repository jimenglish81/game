/**
 * Utility for asserting conditional statements.
 */
export function assert(condition, message) {
	'use strict';

	if (!condition) {
	  throw new Error(`Assert failed: ${message}`);
	}
}
