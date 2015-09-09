var React = require('react');
var Actions = require("../actions/Actions");

class Cell extends React.Component {

  clickCell()  {
    Actions.clickCell(this.props.x, this.props.y);
  }

  rightClick(e) {
    e.preventDefault();
    Actions.markCell(this.props.x, this.props.y);
  }

  render() {
    return <div className={this.cssClass()}
              onContextMenu={this.rightClick.bind(this)}
              onClick={this.clickCell.bind(this)} />;
  }

  cssClass() {
    var cell = this.props.cell;
    if (cell.hidden && cell.marked) return "s m";
    if (cell.hidden) return "s h";
    if (cell.bomb) return "s b";
    if (cell.surrounding>0) return "s n"+cell.surrounding;
    return "s e";  // empty cell
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.cell !== nextProps.cell;
  }
}

module.exports = Cell;





/*

  renderSVG() {
    var xCoord = (this.props.x * this.props.cellSize);
    var yCoord = (this.props.y * this.props.cellSize);
    return (
      <g  className={this.cssClasses()}
          transform={'translate('+xCoord+','+yCoord+')'}
          onContextMenu={this.rightClick.bind(this)}
          onClick={this.clickCell.bind(this)}>
        <rect />
        <text>{this.text()}</text>
      </g>
    );
  }

  cssClasses() {
    var cell = this.props.cell;
    var classes = [];
    if (cell.hidden) classes.push("h");
    if (cell.marked) classes.push("m");
    if (!cell.hidden && cell.bomb) classes.push("b");
    if (!cell.bomb && !cell.hidden) classes.push("n"+cell.surrounding);
    return classes.join(" ");
  }

  text() {
    var cell = this.props.cell;
    var text;
    if (cell.hidden) {
      if (cell.marked) text = "?";
    } else {
      if (cell.bomb) text = "B";
      if (cell.surrounding >0) text = cell.surrounding ;
    }
    return text;
  }

  imageUrl() {
    var cell = this.props.cell;
    if (cell.hidden && cell.marked) return "m.gif";
    if (cell.hidden) return "h.gif";
    if (cell.bomb) return "b.gif";
    if (cell.surrounding>0) return cell.surrounding+".gif";
    return "e.gif";
  }

  renderImg2() {
    var xCoord = this.props.x * this.props.cellSize;
    var yCoord = this.props.y * this.props.cellSize;
    return (
      <img
        style={{transform:"translate("+xCoord+"px,"+yCoord+"px)"}}
        className={this.singleClass()}
        onContextMenu={this.rightClick.bind(this)}
        onClick={this.clickCell.bind(this)} />
    );
  }

  renderImg() {
    return (
      <img src={this.imageUrl()}
        onContextMenu={this.rightClick.bind(this)}
        onClick={this.clickCell.bind(this)} />
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    var cell = this.props.cell;
    var nextCell = nextProps.cell;
    if (cell===nextCell ||
       (cell.hidden && nextCell.hidden && cell.marked == nextCell.marked) ||
       (!cell.hidden && !nextCell.hidden && cell.surrounding == nextCell.surrounding)) return false;
    return true;
  }



*/
