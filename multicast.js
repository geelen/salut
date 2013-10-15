var mee = require('multicast-eventemitter');

var emitter = mee.getEmitter();

// emit a packet everu second,
setInterval(function() {
  var now = new Date().getTime();
  console.log('emitting eventA GLEN', now);
  emitter.emit('eventA', 'this is eventA GLEN', now);
  console.log('emitting eventB GLEN', now);
  emitter.emit('eventB', 'this is eventB GLEN', now);
}, 1000);

// subscribe to eventB events
emitter.on('eventB', function(text, time) {
  console.log('eventB received...', 'text:', text, 'time:', time);
});
