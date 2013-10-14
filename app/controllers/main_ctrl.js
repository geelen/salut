;(function(app) {

  app.controller('MainCtrl', function($scope, User) {
    $scope.User = User;
  });

})(angular.module("Salut"));
