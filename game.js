import { Player } from "./player.js"

export class Game {
    constructor(gameId) {
        this.gameId = gameId;
        this.players = [];
    }

    start(){
        console.log("Új játék indítva, név: " + this.gameId)
    }

    addPlayer(id) {
        var p = new Player(id);
        this.players.push(p);
        console.log(id + " csatlakozott");
    }

    getId() {
        return this.gameId;
    }
}
