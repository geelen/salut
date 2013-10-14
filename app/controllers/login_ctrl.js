;(function(app) {

  app.controller('LoginCtrl', function($scope) {
    $scope.logIn = function() {
      if ($scope.User.username && $scope.User.avatar) {
        $scope.User.loggedIn = true;
      }
    }
  });

})(angular.module("Salut"));
