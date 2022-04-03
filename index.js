const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const { Game } = require('./game.js');

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

  //socket.on('connectPlayer', connectPlayer);
});

function connectPlayer(socket){
    game.addPlayer(socket.playerName);
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
