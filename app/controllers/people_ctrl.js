(function(app) {

  app.controller('PeopleCtrl', function($scope, Chat) {
    $scope.people = Chat.People;
  });

})(angular.module("Salut"));
