var ActionConstants = require("../actions/ActionConstants");
var BaseStore = require("./BaseStore");
var AppDispatcher = require("../dispatcher/AppDispatcher");

// Store single copy of Game
var _highScores = [
  {boardSize: "4 x 4", playerName: "Chris", time: "30 seconds"},
  {boardSize: "4 x 4", playerName: "Jon", time: "10 seconds"}
];

class HighScoreStore extends BaseStore {
  getScores() {
    return _highScores;
  }
}

HighScoreStore.dispatchToken = AppDispatcher.register( function(action) {
  console.log(JSON.stringify(action));
  // TODO
});

module.exports = HighScoreStore;

let _HighScoreStore = new HighScoreStore();

export default _HighScoreStore;
