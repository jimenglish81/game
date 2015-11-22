 /* jshint unused:false */
import StateStore from './utils/state-store';
import State from './utils/state';

export default new StateStore()
  .addAll(
    State.build('menu', {
      execute(game) {
      }
    }),
    State.build('playing', {
      enter(game) {
      },
      execute(game) {
      }
    }),
    State.build('quit', {
      execute(game) {
      }
    })
  );
