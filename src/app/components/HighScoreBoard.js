var React = require("react");
var HighScoreStore = require("../stores/HighScoreStore");

class HighScore extends React.Component {

  render() {
    var highScore = this.props.highscore;
    return (
      <tr>
        <td>{highScore.boardSize}</td>
        <td>{highScore.playerName}</td>
        <td>{highScore.time}</td>
      </tr>
    );
  }

}

class HighScoreBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.highScoreState();
  }

  highScoreState() {
    return {
      highScores: HighScoreStore.getScores()
    };
  }

  render() {
    return (
      <div className="highScoreBoard">
        <h1>Highscores</h1>
        <table>
          <thead>
            <tr>
              <th>Board Size</th>
              <th>Player</th>
              <th>Seconds</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.highScores.map((highscore) =>
                <HighScore highscore={highscore}/>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }

}

module.exports = HighScoreBoard;
