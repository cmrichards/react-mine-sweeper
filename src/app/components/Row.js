var React = require('react');
var Cell = require("./Cell");

class Row extends React.Component {

  render() {
    return (
      <div style={{height:"15px"}}>
        {
          this.props.cells.map((cell, x) =>
            <Cell cell={cell} x={x} y={this.props.y} key={x} />
          )
        }
      </div>
    );
  }

  // Speedup: this.props.cells is an Immutable array

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.cells !== nextProps.cells;
  }
}

module.exports = Row;

/*

  renderHTML2() {
    return (
      <span>
        {
          this.props.cells.map((cell, x) =>
            <Cell cell={cell} x={x} y={this.props.y} key={x} cellSize={this.props.cellSize}/>)
        }
      </span>
    );
  }

  renderSVG() {
    return (
      <g>
        {
          this.props.cells.map((cell, x) =>
            <Cell cell={cell} x={x} y={this.props.y} key={x} cellSize={this.props.cellSize}/>)
        }
      </g>
    );
  }


*/
