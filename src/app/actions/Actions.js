var ActionConstants = require('../actions/ActionConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {

  clickCell: function(x,y) {
    AppDispatcher.dispatch(
      { actionType: ActionConstants.CLICK_CELL, x: x, y: y }
    );
  },

  markCell: function(x,y) {
    AppDispatcher.dispatch(
      { actionType: ActionConstants.MARK_CELL, x: x, y: y }
    );
  },

  newGame: function(cols, rows, difficulty) {
    AppDispatcher.dispatch(
      { actionType: ActionConstants.NEW_GAME,
        cols: cols, rows: rows, difficulty: difficulty}
    );
  },

  showNewGameOptions: function() {
    AppDispatcher.dispatch(
      { actionType: ActionConstants.SHOW_NEW_GAME_OPTIONS }
    );
  },

  hideNewGameForm: function() {
    AppDispatcher.dispatch(
      { actionType: ActionConstants.HIDE_NEW_GAME_OPTIONS }
    );
  }

}

module.exports = Actions;
