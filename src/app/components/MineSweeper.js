var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Board = require("./Board");
var ScoreBoard = require("./ScoreBoard");
var NewGameForm = require("./NewGameForm");
var GameStore = require("../stores/GameStore");
var HighScoreBoard = require("./HighScoreBoard");

class MineSweeper extends React.Component {

  constructor(props) {
    super(props);
    this.state = this._gameState();
    this._onChange = this._onChange.bind(this);
  }

  _gameState() {
    return {game: GameStore.getGame()};
  }

  componentDidMount()    { GameStore.addChangeListener(this._onChange); }
  componentWillUnmount() { GameStore.removeChangeListener(this._onChange) }
  _onChange() { this.setState(this._gameState()) }

  render() {
    var game = this.state.game;
    var board = game.board;

    // Set minimum width/height
    var width = Math.max(board.Ncols * game.cellSize, 550);
    var height = Math.max((board.Nrows * game.cellSize) + 60, 200);;
    if (game.showNewGameForm) height+= 55;

    return (
      <div className={this._cssClasses()} style={{width: width, height: height}}>
        <ScoreBoard game={game} />
        {
          false ?
            <HighScoreBoard/> :
            this.renderBoard()
        }
      </div>
    );
  }

  renderBoard() {
    var game = this.state.game;
    return (
      <div>
        { game.showNewGameForm ?  <NewGameForm game={game}/> : null }
        <Board board={game.board} cellSize={game.cellSize}/>
      </div>
    );
  }

  _cssClasses() {
    var game = this.state.game;
    var cssClass = "container";
    if (game.gameOver()) cssClass += " game_over";
    if (game.complete()) cssClass += " complete";
    return cssClass;
  }

}

module.exports = MineSweeper;


