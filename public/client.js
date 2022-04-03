const socket = io.connect('http://localhost:3000/');

function hallo(name){
    socket.emit('connectPlayer', {playerName: name});
}

function newGame(gameId){
    socket.emit('newGame', { gameId: gameId });
}

socket.on('newGameReady', (payload) => {
    console.log(payload.gameId);
});

$('#new-game-btn').on('click', function(){
    newGame($('#game-id').val());
})


$('#start-btn').on('click', function() {
    console.log("A");
    var name = $('#playerId').val();
    console.log(name);
    newGame(name);
})


