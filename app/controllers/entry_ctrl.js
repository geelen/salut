(function (app) {

  app.controller('EntryCtrl', function ($scope, Chat) {
    $scope.keydown = function(e) {
      if (e.keyCode == 9) {
        e.preventDefault();
        //TAB KEY
      } else if (e.keyCode == 13) {
        //ENTER KEY
        if (!e.shiftKey) {
          e.preventDefault();
          Chat.Send($scope.User.username, $scope.entry);
          $scope.entry = '';
        }
      }
      console.log(e.keyCode)
    }
  });

})(angular.module("Salut"));
