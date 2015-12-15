'use strict';

import Player from '../shared/player';

export default class GameServer {

  constructor() {
    this.players = Object.create(null);
    this.currentTick = 0;
  }

  addSocket(io) {
    io.on('connection', (socket) => {
      this._connect(socket);
      socket.on('command', (cmd, value) => {
        this.command(socket.id, cmd, value);
      });
      socket.on('disconnect', () => this._disconnect(socket));
    });
  }

  _connect(socket) {
    const player = new Player(socket);
    this.players[socket.id] = player;

    //client.onmessage({ data: JSON.stringify({ cmd: 'id', id: player.id }) });
  }

  _disconnect(socket) {
    let player = this.players[socket.id];
    if (player) {
      player.destroy();
      this.players[socket.id] = null;
    }
  }

  gameFrame(){
    this.currentTick++;
    // duration in ms is for timer, but rest of the game works in units per second (they're nicer!)
    let duration_ms = Date.now() - this.lastFrameDuration;
    let duration_s = duration_ms / 1000;

    // although game is supposed to be running at fixed frame rate
    // I still track frame duration and include it in calculations
    // just for demostration (it could be omitted in truly fixed-framerate game)
    // this.performActions(duration_s);
    // this.moveObjects(duration_s);
    // this.checkCollisions();
    // this.broadcastObjects();
    // this.removeObjects();

    window.setTimeout(this.gameFrame, 1000 / 30 - duration_ms);
    this.lastFrameDuration = Date.now();
  }

  command(cmd, id, value) {
    this.players[id][cmd] = value;
  }

  destroy() {

  }
}
