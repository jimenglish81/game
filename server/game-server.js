'use strict';

import Player from '../shared/player';

export default class GameServer {

  constructor() {
    this.players = Object.create(null);
  }

  addSocket(io) {
    io.on('connection', (socket) => {
      this._connect(socket);
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

  command(command, arg, player_id) {
    this.players[player_id][command] = arg;
  }

  destroy() {

  }
}
