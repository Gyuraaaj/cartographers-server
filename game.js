const { Player } = require("./player");

exports.Game = function(gameId) {
    var id = gameId; 
    var players = [];

    this.start = function() {
        console.log("Új játék indítva, név: " + gameId)
    }

    this.addPlayer = function(id) {
        var p = new Player(id);
        players.push(p);
        console.log(id + " csatlakozott");
    }

    this.getId = function() {
        return id;
    }
}
