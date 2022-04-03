const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const { Game } = require('./game.js');

app.use(express.static('public'))

var games = [];

io.on('connection', (socket) => {

  console.log(socket.id +  ' connected');
  socket.on('disconnect', () => {
    console.log(socket.id +  ' disconnected');
  });

  socket.on('connectPlayer', connectPlayer)
});

function connectPlayer(socket){
  console.log(socket.playerName + " started");
    let game = new Game();
    game.start();
    games.push(game);
}

http.listen(port, () => {
  console.log('listening on *:3000');
});
