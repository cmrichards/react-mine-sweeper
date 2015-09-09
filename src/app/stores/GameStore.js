var ActionConstants = require("../actions/ActionConstants");
var AppDispatcher = require("../dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var MineBoard = require("../MineBoard");
var Game = require("../Game");

var _game;  

class GameStore extends BaseStore {
  getGame() {
    if(!_game) _game = new Game(60, 30, 1);
    return _game;
  }
}

AppDispatcher.register( function(action) {
  console.log(JSON.stringify(action));
  switch(action.actionType) {
    case ActionConstants.NEW_GAME:
      _game = new Game(action.cols, action.rows, action.difficulty);
      _GameStore.emitChange();
      break;
    case ActionConstants.CLICK_CELL:
      _game.clickCell(action.x, action.y);
      _GameStore.emitChange();
      break;
    case ActionConstants.MARK_CELL:
      _game.markCell(action.x, action.y);
      _GameStore.emitChange();
      break;
    case ActionConstants.SHOW_NEW_GAME_OPTIONS:
      _game.showNewGameOptions();
      _GameStore.emitChange();
      break;
    case ActionConstants.HIDE_NEW_GAME_OPTIONS:
      _game.hideNewGameOptions();
      _GameStore.emitChange();
      break;
  }
});

module.exports = GameStore;

let _GameStore = new GameStore();

export default _GameStore;
