import State from './utils/state';

const states = {
  menu: State.build('menu', {
    execute(game) {
      if (game.isPlaying) {
        game.setState('playing');
      }
    }
  }),
  playing: State.build('playing', {
    execute(game) {
      if (game.isQuiting) {
        game.setState('quit');
      }
    }
  }),
  quit: State.build('quit', {
    execute(game) {
      game.setState('menu');
    }
  })
};
states.initial = states.menu;

export default {
  states,
  get(state) {
    return states[state + ''];
  }
};

// name: 'start',  from: 'menu',                  to: 'starting' },
    // { name: 'load',   from: ['starting', 'playing'], to: 'loading'  },
    // { name: 'play',   from: 'loading',               to: 'playing'  },
    // //{ name: 'help',   from: ['loading', 'playing'],  to: 'help'     }, // pause the game to show a help topic
    // //{ name: 'resume', from: 'help',                  to: 'playing'  }, // resume playing after showing a help topic
    // { name: 'lose',   from: 'playing',               to: 'lost'     }, // player died
    // { name: 'quit',   from: 'playing',               to: 'lost'     }, // player quit
    // { name: 'win',    from: 'playing',               to: 'won'      }, // player won
    // { name: 'finish', from: ['won', 'lost'],         to: 'menu'     }  // back to menu
