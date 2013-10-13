// NodeJS example of the Salut API (for command-line usage)

var username = argv[2] || require('os').hostname(),
  avatar = argv[3] || "http://i.imgur.com/V27656Y.gif";

console.log("Logging you in as " + username);
if (argv.length < 4) console.log("USAGE node salut.js [USERNAME] [AVATAR_URL]")

discovery.connect({
  username: username, avatar: avatar
}).then(function (chat) {
    chat.on('message', function(message) {
      console.log("[" + message.username + "] " + messsage.body);
    });
    process.stdin.resume();
    process.stdin.on("data", function(data) {
      console.log(data);
      chat.send(data.toString().trim());
    });
  });
