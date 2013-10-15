(function (app) {

  app.factory('Chat', function (User) {
    return {
      People: [
        {username: "Alice", avatar: "http://lorempixel.com/80/80/abstract/1"},
        {username: "Bob", avatar: "http://lorempixel.com/80/80/abstract/2"}
      ],
      Messages: [
        {type: "event", timestamp: new Date(new Date() - 9000000), username: "Alice", body: "is here."},
        {type: "message", timestamp: new Date(new Date() - 8000000), username: "Alice", body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt"},
        {type: "event", timestamp: new Date(new Date() - 7000000), username: "Charles", body: "is here."},
        {type: "message", timestamp: new Date(new Date() - 6000000), username: "Charles", body: "ut labore et dolore magna aliqua"},
        {type: "event", timestamp: new Date(new Date() - 5000000), username: "Charles", body: "is gone."},
        {type: "event", timestamp: new Date(new Date() - 4000000), username: "Bob", body: "is here."},
        {type: "message", timestamp: new Date(new Date() - 3000000), username: "Bob", body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
        {type: "message", timestamp: new Date(new Date() - 2000000), username: "Alice", body: "Bob: whatevs."},
        {type: "message", timestamp: new Date(new Date() - 1000000), username: "Alice", body: "geelen: Hey dude."}
      ],
      Send: function (body) {
        this.Messages.push({type: "message", timestamp: new Date(), username: User.username, body: body})
      }
    }
  });

})(angular.module("FakeChat"));

(function (app) {

  app.factory('Chat', function (User, $rootScope) {

    var emitter = require('multicast-eventemitter').getEmitter();

    var Chat = { People: [], Messages: [] };

    // subscribe to JOINED
    emitter.on('Salut.USER_JOINED', function (username, avatar) {
      console.log('A wild user has appeared. ' + username);
      Chat.Messages.push({type: "event", timestamp: new Date(), username: username, body: "joined the room."});
      if (username !== User.username) {
        Chat.People.push({username: username, avatar: avatar});
        emitter.emit('Salut.USER_HERE', User.username, User.avatar);
      }
      $rootScope.$apply();
    });
    emitter.on('Salut.USER_HERE', function (username, avatar) {
      if (username !== User.username) {
        console.log(username + ' is in the room.');
        var knowIt = false;
        Chat.People.forEach(function (c) {
          if (c.username === username) knowIt = true;
        });
        if (!knowIt) {
          Chat.People.push({username: username, avatar: avatar});
          Chat.Messages.push({type: "event", timestamp: new Date(), username: username, body: "is here."});
        }
        $rootScope.$apply();
      }
    });
    emitter.on('Salut.USER_LEFT', function (username) {
      console.log(username + ' is gone.');
      Chat.People.forEach(function (c, i) {
        if (c.username === username) Chat.People.splice(i, 1);
      });
      Chat.Messages.push({type: "event", timestamp: new Date(), username: username, body: "left the room."});
      $rootScope.$apply();
    });


    // subscribe to MESSAGE
    emitter.on('Salut.MESSAGE', function (username, body) {
      console.log("[" + username + "] " + body);
      Chat.Messages.push({type: "message", timestamp: new Date(), username: username, body: body});
      $rootScope.$apply();
    });

    // We are here!
    emitter.emit('Salut.USER_JOINED', User.username, User.avatar);

    Chat.Send = function (body) {
      emitter.emit('Salut.MESSAGE', User.username, body);
    }

    // We are leaving!
    process.on('exit', function () {
      console.log("Leaving!");
      emitter.emit('Salut.USER_LEFT', User.username);
    });

    return Chat;
  });

})(angular.module("RealChat"));
