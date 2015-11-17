import State from './utils/state';

const states = {
  menu: State.build('menu', {
    execute(game) {
    }
  }),
  playing: State.build('playing', {
    enter(game) {
    },
    execute(game) {
    }
  }),
  quit: State.build('quit', {
    execute(game) {
    }
  })
};

export default {
  initial: states['menu'],
  get(key) {
    return states[key];
  }
};
