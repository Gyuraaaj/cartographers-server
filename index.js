import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { Game } from './game.js'

const app = express(); 
const http = createServer(app); 
const io = new Server(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

var games = [];

io.on('connection', (socket) => {
  //console.log(socket.id +  ' connected');

  socket.on('disconnect', () => {
    //console.log(socket.id +  ' disconnected');
  });

  socket.on('newGame', (payload) => {
    console.log(payload.gameId);
    var id = createNewGame(payload.gameId);
    socket.emit('newGameReady', {gameId: id});
  });

  socket.on('connectPlayer', (payload) => {
    console.log(payload.playerName)
    connectPlayer(payload.playerName)
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
