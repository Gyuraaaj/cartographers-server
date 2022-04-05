import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { Game } from './game.js';
import  Board  from './boards.js';

const app = express(); 
const http = createServer(app); 
const io = new Server(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

var games = [];

io.on('connection', (socket) => {

  socket.on('disconnect', () => {
  });

  socket.on('newGameRequest', (payload) => {
    var id = createNewGame(payload.gameId);
    console.log(id);
    socket.emit('newGameReady', {gameId: id, board: Board.board});
  });

  socket.on('connectPlayerRequest', (payload) => {
    connectPlayer(payload.playerName);
    socket.emit('connectPlayerReady');
  });
});

function connectPlayer(playerName){
    games[0].addPlayer(playerName);
}

function createNewGame(gameId){
  let game = new Game(gameId);
  game.start();
  games.push(game);
  return game.getId();
}

http.listen(port, () => {
  console.log('listening on *:3000');
});
