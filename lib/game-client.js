export default class GameClient {
  constructor(socket) {
    this.socket = socket;
    this._initialise();
  }

  _initialise() {
    this.objects = [];
    this.transferred = 0;
    this.socket.on('event', (event) => this._onEvent(event));
    window.setInterval(() => {
      console.log(this.transferred/1000,"KB/s");
      this.transferred = 0;
    }, 1000);
  }

  updatePositions() {
    const now = Date.now();

    this.lastPositionUpdate = now;
  }

  command(command) {
    //this.socket.emit(command, arg, this.player_id);
  }

  _onEvent(event) {
    this._transferred += event.data.length;

    let data = JSON.parse(event.data);
    switch (data.cmd) {
      case 'command':
        break;
      default:
        console.error('unknown data', data);
    }
  }

  destroy() {
    this.socket.disconnect();
    this.socket = null;
  }
}
