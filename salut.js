// NodeJS example of the Salut API (for command-line usage)

var //discovery = require('./discovery'),
  username = process.argv[2] || require('os').hostname(),
  avatar = process.argv[3] || "http://i.imgur.com/V27656Y.gif";
//
//console.log("Logging you in as " + username);
//if (process.argv.length < 4) console.log("USAGE node salut.js [USERNAME] [AVATAR_URL]")
//
//discovery.connect(username, avatar).then(function (chat) {
//    chat.on('message', function(message) {
//      console.log("[" + message.username + "] " + message.body);
//    });
//    process.stdin.resume();
//    process.stdin.on("data", function(data) {
//      chat.send(data.toString().trim());
//    });
//  });


var mee = require('multicast-eventemitter');

var emitter = mee.getEmitter();

// subscribe to JOINED
emitter.on('Salut.USER_JOINED', function(user, avatar) {
  console.log('A wild user has appeared. ' + user);
});

// subscribe to MESSAGE
emitter.on('Salut.MESSAGE', function(user, body) {
  console.log("[" + user + "] " + body);
});


// We are here!
emitter.emit('Salut.USER_JOINED', username, avatar);

// This is what we have to say!
process.stdin.resume();
process.stdin.on("data", function(data) {
  emitter.emit('Salut.MESSAGE', username, data.toString().trim());
});

// We are leaving!
process.on('SIGINT', function() {
  emitter.emit('Salut.USER_LEFT', username);
  process.exit();
});
