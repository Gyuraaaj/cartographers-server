const socket = io.connect('http://localhost:3000/');

var board = $('<div></div>');
var boardData;

function addPlayer(name){
    socket.emit('connectPlayerRequest', {playerName: name});
}

function newGame(gameId){
    socket.emit('newGameRequest', { gameId: gameId });
}

socket.on('newGameReady', (payload) => {
    boardData=payload.board;
});

socket.on('connectPlayerReady', () => {
    $('#player-id-menu').hide();
    drawboard();
    board.attr('id', 'board');
});

function drawboard() {
    $('body').append(board);
    $(boardData).each(function(outerIndex){
        $(boardData[outerIndex]).each(function(innerIndex){
            let block = $('<div></div>');
            $(block).addClass('block');
            switch(boardData[outerIndex][innerIndex]){
                case 0: 
                    $(block).addClass('emptyBlock');
                    break;
                case 1:
                    $(block).addClass('mountainBlock');
                    break; 
            }
            board.append(block);
        });
    });
}

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
