var React = require('react');
var Row = require("./Row");

class Board extends React.Component {

  render() {
    var height = this.props.board.Nrows * this.props.cellSize;
    var width = this.props.board.Ncols * this.props.cellSize;
    return (
      <div style={{height: height, width: width}} className="board">
        {
          this.props.board.rows.map((cells, y) =>
              <Row key={y} cells={cells} y={y} cellSize={this.props.cellSize}/>
          )
        }
      </div>
    );
  }

}

module.exports = Board;


/*
 renderSVG() {
    var height = this.props.board.Nrows * this.props.cellSize;
    var width = this.props.board.Ncols * this.props.cellSize;
    return (
      <svg width={width} height={height} className="board">
        {
          this.props.board.rows.map((cells, y) =>
              <Row key={y} cells={cells} y={y} cellSize={this.props.cellSize}/>
          )
        }
      </svg>
    );
  }
*/

