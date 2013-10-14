;
(function (app) {

  app.factory('User', function ($rootScope) {
    var User = $rootScope.$new(true);
    User.reset = function () {
      angular.extend(User, {
        username: undefined,
        avatar: "http://i.imgur.com/V27656Y.gif",
        loggedIn: false
      });
    };
    User.save = function() {
      localStorage.setItem("Salut.User", JSON.stringify({
        username: User.username, avatar: User.avatar, loggedIn: User.loggedIn
      }));
    };
    User.$watch('loggedIn', User.save);

    var userData = localStorage.getItem("Salut.User"),
      user = userData && JSON.parse(userData);
    if (user) {
      angular.extend(User, user);
    } else {
      User.reset();
    }

    return User;
  });

})(angular.module("Salut"));
