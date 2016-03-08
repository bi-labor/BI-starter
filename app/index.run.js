(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
