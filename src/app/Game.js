var MineBoard = require("./MineBoard");

class Game {

  constructor(cols, rows, difficulty) {
    this.cellSize = 15;
    this.defaultCols = cols;
    this.defaultRows = rows;
    this.defaultDifficulty = difficulty;
    this.showNewGameForm = false;
    this.board = new MineBoard(cols, rows, difficulty);
  }

  showNewGameOptions() { this.showNewGameForm = true; }
  hideNewGameOptions() { this.showNewGameForm = false; }

  _gameStopped() {
    return (this.gameOver() || this.complete());
  }

  clickCell(x,y) {
    if (this._gameStopped()) return;
    this._startTimer();
    this.board.clickCell(x,y)

    if(this.gameOver() || this.complete())
      this.totalTimeElapsed = this.timeElapsed();
  }

  markCell(x,y)  {
    if (this._gameStopped()) return;
    this._startTimer();
    this.board.markCell(x,y)
  }

  _startTimer() {
    if (!this.startTime) this.startTime = new Date();
  }

  timeElapsed() {
    if (this.totalTimeElapsed) return this.totalTimeElapsed;
    return this.startTime ? Math.floor(((new Date()) - this.startTime)/1000) : 0;
  }

  gameOver() {
    return this.board.hasBombExploded();
  }

  complete() {
    return this.board.isBoardFullyCleared();
  }

  statusMessage() {
    var message;
    if(this.gameOver())
      message = "Game Over";
    else if (this.complete())
      message = "Complete";
    else
      message = "In Progress";
    return message;
  }
}

module.exports = Game;
