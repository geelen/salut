// NodeJS example of the Salut API (for command-line usage)

var discovery = require('./discovery'),
  username = process.argv[2] || require('os').hostname(),
  avatar = process.argv[3] || "http://i.imgur.com/V27656Y.gif";

console.log("Logging you in as " + username);
if (process.argv.length < 4) console.log("USAGE node salut.js [USERNAME] [AVATAR_URL]")

discovery.connect(username, avatar).then(function (chat) {
    chat.onMessage(function(message) {
      console.log("[" + message.username + "] " + message.body);
    });
    process.stdin.resume();
    process.stdin.on("data", function(data) {
      chat.send(data.toString().trim());
    });
  });
