(function(app) {

  app.controller('ChatCtrl', function($scope, Chat) {
    $scope.messages = Chat.Messages;
  });

})(angular.module("Salut"));
