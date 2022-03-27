const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log(socket.id)
});

http.listen(port, () => {
  console.log('listening on *:3000');
});
