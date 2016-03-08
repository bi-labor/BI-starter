(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .factory('FirebaseDataService', FirebaseDataService);

  /** @ngInject */
  function FirebaseDataService(firebaseRef) {
    var root = new Firebase(firebaseRef);

    var service = {
      root: root,
      questions: root.child("questions"),
      votes: root.child("votes"),
      options: root.child("options"),
      reset: reset
    };

    return service;

    function reset(){
      root.remove();
    }
  }

})();
