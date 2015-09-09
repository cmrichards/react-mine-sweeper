var React = require('react');
var Actions = require("../actions/Actions");
var Cell = require("./Cell");

class ScoreBoard extends React.Component {

  constructor(props) {
    super(props);
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount()    { this.updateTime(); }
  componentWillUnmount() { clearTimeout(this.timerRefresh); }

  // Force a render this component every second to refresh the time-elapsed field

  updateTime() {
    this.forceUpdate();
    this.timerRefresh = setTimeout(this.updateTime, 1000);
  }

  newGame()  {
    Actions.showNewGameOptions();
  }

  render() {
    var game = this.props.game;
    var board = game.board;

    return (
      <div className="scoreboard">
        <div className="pane">{game.timeElapsed()} secs</div>
        <div className="pane">{game.statusMessage()}</div>
        <div className="pane">
          Flags : {board.numberOfMarkedCells} / {board.numberOfBombs()}
        </div>
        <div className="pane">Cleared : {board.clearedCells}</div>
        <div>
          <button className="newGame" onClick={this.newGame}>New Game</button>
        </div>
      </div>
    );
  }

}

module.exports = ScoreBoard;
