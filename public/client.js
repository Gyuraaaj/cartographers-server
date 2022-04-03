const socket = io.connect('http://localhost:3000/');

function hallo(name){
    socket.emit('connectPlayer', {playerName: name});
}

