import _ from 'lodash';

/**
 * Utility to allow functionality to mixed into the prototype of a Class.
 * @example
 * let MyNewClass = mixin(MyClass, {
 *   newMethod() ...
 * },
 * {
 *   anotherMethod() ...
 * });
 *
 * @param {function} Cls Class to mix functionality into.
 * @param {...Object} mixins Mixins to apply.
 * @return {function}
 */
export default function mixin(Cls, ...mixins) {
  'use strict';

  class Mixed extends Cls {}
  [].concat(mixins).forEach((mixin) => _.assign(Mixed.prototype, mixin));

  return Mixed;
}
