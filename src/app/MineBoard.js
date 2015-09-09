var Immutable = require('immutable');

class BoardCell {
  // Represents a single cell on the board
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.marked = this.bomb = false;
    this.hidden = true;
    this.surrounding = 0;
  }

  clone() {
    var clone = new BoardCell();
    clone.marked = this.marked;
    clone.bomb = this.bomb;
    clone.hidden = this.hidden;
    clone.surrounding = this.surrounding;
    clone.x = this.x;
    clone.y = this.y;
    return clone;
  }
}

class MineBoard {

  constructor(cols, rows, difficulty) {
    this.Nrows = rows;
    this.Ncols = cols;
    this.difficulty = difficulty; // 1 to 3 (Easy to Hard)
    this.getCell.bind(this);
    this.createCells();
    this.placeBombs();
    this.numberOfMarkedCells = 0;
    this.bombExploded = false;
    this.clearedCells = 0;
  }

  isBoardFullyCleared() {
    if(this.bombExploded) return false;
    return this.rows.every(cells =>
                           cells.every( cell => !cell.hidden || (cell.hidden && cell.bomb))
                          );
  }

  createCells() {
    this.rows = new Array(this.Nrows);
    for(var y = 0; y < this.Nrows; y++) {
      var row =new Array();
      for(var x = 0; x < this.Ncols; x++)
        row.push(new BoardCell(x,y));
      this.rows[y] = Immutable.List(row);
    }
  }

  hasBombExploded() { return this.bombExploded; }

  getCell(x,y) {
    if(x >=0 && x < this.Ncols && y >=0 && y < this.Nrows)
      return this.rows[y].get(x);
  }

  clickCell(x,y) {
    var cell = this.getCell(x,y);
    if (!cell.hidden || cell.marked) return;
    if (cell.bomb || cell.surrounding > 0) this.clear(x,y);
    if (!cell.bomb && cell.surrounding == 0) this.revealArea(x,y);
  }

  updateCell(x,y, update) {
    var cell = this.getCell(x,y).clone();
    update(cell);
    this.rows[y] = this.rows[y].set(x, cell);
  }

  markCell(x,y) {
    if (this.hasBombExploded()) return;
    this.updateCell(x,y, (cell) => {
      if (cell.hidden) cell.marked = !cell.marked;
      this.numberOfMarkedCells += cell.marked ? 1 : -1;
    });
  }

  clear(x,y) {
    this.updateCell(x,y, (cell) => {
      this.clearedCells++;
      cell.hidden = cell.marked = false;
      if (cell.bomb) this.hitBomb();
    });
  }

  hitBomb(x,y) {
    this.bombExploded = true;

    // Reveal all bombs and un-hide everything
    this.rows.forEach((cells, y) => {
      cells.forEach((cell,x) => {
        this.updateCell(x,y, (cell) => {if(cell.bomb || cell.hidden) cell.hidden = false;});
      });
    });
  }

  // Only reveal cells connected to the cell at [x,y] that are empty or
  // have a number in.  The boundary of the reveal area are cells
  // that have a number.

  revealArea(x,y) {
    this.clear(x,y);
    var queue = [[x,y]];
    var cell, coords;
    while(coords = queue.pop()) {
      cell = this.getCell(coords[0], coords[1]);
      for( let [diffX, diffY] of [ [-1,0], [1,0], [0,1], [0,-1] ]) {
        var adjacentCell = this.getCell(cell.x + diffX, cell.y + diffY);

        if(!adjacentCell || !adjacentCell.hidden || adjacentCell.marked || adjacentCell.bomb)
          continue;

        this.clear(adjacentCell.x, adjacentCell.y);

        if (adjacentCell.surrounding == 0)
          queue.push([adjacentCell.x, adjacentCell.y]);
      }
    }
  }

  numberOfBombs() {
    var divisors = { 1: 14, 2: 9, 3: 5 }
    return Math.round((this.Ncols * this.Nrows) / divisors[this.difficulty]);
  }

  // Add X number of bombs to the page
  placeBombs(numberOfBombs) {
    // Place bombs
    var random = (max) => { return Math.floor(Math.random() * max) ;};
    var bombsPlaced = 0;
    while(bombsPlaced < this.numberOfBombs()) {
      var cell = this.getCell(random(this.Ncols), random(this.Nrows));
      if(!cell.bomb) {
        this.updateCell(cell.x, cell.y, (cell) => {cell.bomb = true;});
        bombsPlaced++;
      }
    }
    // Add number to cells
    for(var y = 0; y < this.Nrows; y++) {
      for(var x = 0; x < this.Ncols; x++) {
        var cell = this.getCell(x,y);
        if(cell.bomb) continue;
        var bombs = 0;
        var surroundingPositions = [ [-1,0], [1,0], [0,1], [0, -1], [-1,-1], [1,-1], [1,1], [-1,1] ];
        for(let [diffX, diffY] of surroundingPositions) {
          var c = this.getCell(x + diffX, y + diffY);
          if (c && c.bomb) bombs++;
        }
        this.updateCell(x,y, (cell) => { cell.surrounding = bombs; });
      }
    }
  }

}

module.exports = MineBoard;


/*

  NOT USED BECAUSE IT CREATES A STACK SIZE EXCEPTION FOR VERY LARGE BOARDS

  recursiveClear(x,y) {
    var cell = this.getCell(x,y)

    // Stop clearing if cell is visible or marked
    if(!cell || !cell.hidden || cell.marked || cell.bomb) return;

    this.clear(x,y)

    // Stop clearing if cell has any surrounding bombs
    if (cell.surrounding > 0) return;

    // Clear all adjacent positions
    for( let [diffX, diffY] of [ [-1,0], [1,0], [0,1], [0,-1] ]) {
      this.recursiveClear(x + diffX, y + diffY)
    }
  }

*/
