;(function(app) {

  app.controller('MainCtrl', function($scope, User) {
    $scope.User = User;

    $scope.logOut = User.reset;
  });

})(angular.module("Salut"));
