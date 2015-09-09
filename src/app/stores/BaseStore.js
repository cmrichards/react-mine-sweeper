var EventEmitter = require('events').EventEmitter;

class BaseStore extends EventEmitter {
  addChangeListener(callback)    { this.on('CHANGE', callback); }
  removeChangeListener(callback) { this.removeListener('CHANGE', callback); }
  emitChange() { this.emit('CHANGE'); }
}

module.exports = BaseStore;
