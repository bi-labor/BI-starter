/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .constant('moment', moment)
    .constant('firebaseRef', 'https://angularvoteapp.firebaseio.com');

})();
