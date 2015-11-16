import State from './utils/state';

const states = {
  menu: State.build('menu', {
    enter(game) {
      game.displayMenu = true;
    },
    execute(game) {
      if (game.isPlaying) {
        game.fsm.changeState(states.playing);
      }
    },
    exit(game) {
      game.displayMenu = false;
    }
  }),
  playing: State.build('playing', {
    enter(game) {
      game.foo = false;
    },
    execute(game) {
      if (game.isQuiting) {
        game.fsm.changeState(states.quit);
      }
    }
  }),
  quit: State.build('quit', {
    enter(game) {
      game.foo = true;
    },
    execute(game) {
      game.fsm.changeState(states.menu);
    }
  })
};

export default states;

// name: 'start',  from: 'menu',                  to: 'starting' },
    // { name: 'load',   from: ['starting', 'playing'], to: 'loading'  },
    // { name: 'play',   from: 'loading',               to: 'playing'  },
    // //{ name: 'help',   from: ['loading', 'playing'],  to: 'help'     }, // pause the game to show a help topic
    // //{ name: 'resume', from: 'help',                  to: 'playing'  }, // resume playing after showing a help topic
    // { name: 'lose',   from: 'playing',               to: 'lost'     }, // player died
    // { name: 'quit',   from: 'playing',               to: 'lost'     }, // player quit
    // { name: 'win',    from: 'playing',               to: 'won'      }, // player won
    // { name: 'finish', from: ['won', 'lost'],         to: 'menu'     }  // back to menu
