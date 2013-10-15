// NodeJS example of the Salut API (for command-line usage)

var mee = require('multicast-eventemitter');
  username = process.argv[2] || require('os').hostname(),
  avatar = process.argv[3] || "http://i.imgur.com/V27656Y.gif";
  emitter = mee.getEmitter();

// subscribe to JOINED
emitter.on('Salut.USER_JOINED', function (user, av) {
  console.log('A wild user has appeared. ' + user);
  if (user !== username) emitter.emit('Salut.USER_HERE', username, avatar);
});
emitter.on('Salut.USER_HERE', function (user, avatar) {
  console.log(user + ' is in the room.');
});
emitter.on('Salut.USER_LEFT', function (user, av) {
  console.log('Goodbye ' + user + '!');
});

// subscribe to MESSAGE
emitter.on('Salut.MESSAGE', function (user, body) {
  console.log("[" + user + "] " + body);
});

// We are here!
emitter.emit('Salut.USER_JOINED', username, avatar);

// This is what we have to say!
process.stdin.resume();
process.stdin.on("data", function (data) {
  emitter.emit('Salut.MESSAGE', username, data.toString().trim());
});

// We are leaving!
process.on('SIGINT', function () {
  console.log("Leaving!");
  emitter.emit('Salut.USER_LEFT', username);
  emitter.on('Salut.USER_LEFT', function (user) {
    if (user === username) process.exit();
  });
});
