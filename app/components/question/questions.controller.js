(function () {
  'use strict';

  angular
    .module('angularVoteApp')
    .controller('QuestionsController', QuestionsController);

  /** @ngInject */
  function QuestionsController(QuestionService, VoteService, $mdDialog) {
    var vm = this;

    //TODO: get questions
  }
})();
