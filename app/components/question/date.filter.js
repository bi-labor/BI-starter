(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .filter('readabledate', dateFilter);

  /** @ngInject */
  function dateFilter() {
    return function (time) {
      return moment(time).fromNow();
    };
  }
})();
