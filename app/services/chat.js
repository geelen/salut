(function (app) {

  app.factory('Chat', function () {
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
      Send: function(username, body) {
        this.Messages.push({type: "message", timestamp: new Date(), username: username, body: body})
      }
    }
  });

})(angular.module("FakeChat"));

(function (app) {

  app.factory('Chat', function ($scope) {
  });

})(angular.module("RealChat"));
