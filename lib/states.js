import State from './utils/state';

export default {
  menu: State.build('menu', {
    execute(game) {

    }
  }),
  playing: State.build('playing', {
    enter(game) {
      game.setMap({
        spawn: { x: 10, y: 10 }
      });
    },

    execute(game) {

    }
  }),
  quit: State.build('quit', {
    execute(game) {

    }
  })
};
