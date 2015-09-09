var React = require("react/addons");
var Actions = require("../actions/Actions");

class NewGameForm extends React.Component {

  render() {
    return (
      <form className="newGameForm" onSubmit={this.handleSubmit.bind(this)} >
        <input type="text" placeholder="Cols" ref="cols" defaultValue={this.props.game.defaultCols}/>
        &nbsp; x &nbsp;
        <input type="text" placeholder="Rows" ref="rows" defaultValue={this.props.game.defaultRows}/>
        &nbsp;
        <select ref="difficulty" defaultValue={this.props.game.defaultDifficulty}>
          <option value={1}>Easy</option>
          <option value={2}>Medium</option>
          <option value={3}>Hard</option>
        </select>
        &nbsp;
        <button>Start Game</button>
        &nbsp;
        <a href="#" onClick={this.cancel}>Cancel</a>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    var cols = parseInt(React.findDOMNode(this.refs.cols).value);
    var rows = parseInt(React.findDOMNode(this.refs.rows).value);
    var difficulty = parseInt(React.findDOMNode(this.refs.difficulty).value);
    Actions.newGame(cols, rows, difficulty);
  }

  cancel() {
    Actions.hideNewGameForm();
  }

}

module.exports = NewGameForm;
