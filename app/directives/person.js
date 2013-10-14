(function (app) {

  app.directive('person', function () {
    return {
      restrict: 'E',
      template: "<div class=\"person\">\n  <img ng-src=\"{{ person.avatar }}\" alt=\"{{ person.username }}\"/>\n  {{ person.username }}\n</div>",
      scope: {person: '=who'}
    }
  });

})(angular.module("Salut"));
