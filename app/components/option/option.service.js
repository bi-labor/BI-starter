(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .factory('OptionService', OptionService);

  /** @ngInject */
  function OptionService($firebaseArray, FirebaseDataService) {
    var options = null;

    var service = {
      Option: Option
    };

    init();

    return service;

    function Option(){
      this.label = '';
    }

    function init(){

    }
  }
})();
