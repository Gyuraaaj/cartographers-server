const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const { Game } = require('./game.js');

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log(socket.id +  ' connected');
  let game = new Game();
  game.start();
  socket.on('disconnect', () => {
    console.log(socket.id +  ' disconnected');
  });
});

http.listen(port, () => {
  console.log('listening on *:3000');
});
