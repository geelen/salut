(function (app) {

  app.directive('stickyBottom', function ($rootScope) {
    return {
      scope: true,
      link: function(scope, element, attrs) {
        var stuck = true, el = element[0];

        var scrollToBottom = function() {
          if (stuck) requestAnimationFrame(function() {
            el.scrollTop = el.scrollHeight;
          });
        }
        $rootScope.$on('Salut.LayoutInvalidated', scrollToBottom);

        element.on('scroll', function() {
          stuck = !(el.scrollTop < el.scrollHeight - el.getBoundingClientRect().height);
        });

        scrollToBottom();
      }
    }
  });

})(angular.module("Salut"));
