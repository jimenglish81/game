export function assert(condition, message){
	if (!condition) {
    throw new Error(`Assert failed: ${message}`);
  }
}
