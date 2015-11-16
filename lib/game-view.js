import Emitter from './utils/emitter';
import menuItems from './menu-items';

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function checkPos() {
  return true;
}

export default class GameView extends Emitter {

  constructor(game, canvas) {
    super();
    this.game = game;
    this.ctx = canvas.getContext('2d');
    this._attachEvents();
    this.update();
  }

  _attachEvents() {
    this.ctx.canvas.addEventListener('click', this._handleClick.bind(this), false);
  }

  _handleClick(evt) {
    const state = this.game.getState();
    let pos = getMousePos(this.ctx.canvas, evt);
    switch(state.id) {
      case 'menu':
        this.game.setState('playing');
        break;
      case 'playing':
        // this.thrust = 1;
        // this.game.targetX = pos.x;
        // this.game.targetY = pos.y;
        break;
      default:
        console.log('none');
    }
  }

  _renderPlayer({x, y}) {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  _renderMenu() {
    let ctx = this.ctx;
    let x = ctx.canvas.width / 2;
    let y = ctx.canvas.height / 2;
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    menuItems.forEach((item) => {
      ctx.fillStyle = 'red';
      ctx.fillText(`${item.label}`, x, y);
    });
  }

  _renderGame() {
    let ctx = this.ctx;
    let x = ctx.canvas.width / 2;
    let y = ctx.canvas.height / 2;
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (this.game.player) {
      this._renderPlayer(this.game.player);
    }
  }

  render() {
    const state = this.game.getState();
    switch(state.id) {
      case 'menu':
        this._renderMenu();
        break;
      case 'playing':
        this._renderGame();
        break;
      default:
        console.log('none');
    }
  }

  update() {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    //this.setUpViewport();
    this.render();
    ctx.restore();
    window.requestAnimationFrame(() => this.update());
  }
}
