(function() {

  angular.module('FakeChat', []); // holds stubs for development
  angular.module('RealChat', []); // holds the real node bindings

  angular.module("Salut", ['FakeChat']);
//  angular.module("Salut", ['RealChat']);

})();
