const socket = io.connect('http://localhost:3000/');

function addPlayer(name){
    socket.emit('connectPlayer', {playerName: name});
}

function newGame(gameId){
    socket.emit('newGame', { gameId: gameId });
}

socket.on('newGameReady', (payload) => {
    console.log(payload.gameId);
});

$('#new-game-btn').on('click', function(){
    if($('#game-id').val().length > 0){
        $('#new-game-menu').hide();
        newGame($('#game-id').val());
        $('#player-id-menu').show();
    }       
})

$('#add-player-btn').on('click', function() {
    var name = $('#player-id').val();
    console.log(name)
    addPlayer(name);
})

$(function() {
    $('#player-id-menu').hide();
});
