import _ from 'lodash';

export default function mixin(Cls, ...mixins) {
  class Mixed extends Cls {}
  [].concat(mixins).forEach((mixin) => _.assign(Mixed.prototype, mixin));
  return Mixed;
};
