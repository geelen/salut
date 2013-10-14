(function (app) {

  app.directive('person', function () {
    return {
      transclude: true,
      restrict: 'E',
      template: "<div class=\"person\">\n  <img ng-src=\"{{ person.avatar }}\" alt=\"{{ person.username }}\"/>\n  {{ person.username }} <span ng-transclude></span>\n</div>",
      scope: {person: '=who'}
    }
  });

})(angular.module("Salut"));
