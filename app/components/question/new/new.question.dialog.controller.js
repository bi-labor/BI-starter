(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .controller('NewQuestionDialogController', NewQuestionDialogController);

  /** @ngInject */
  function NewQuestionDialogController($mdDialog, QuestionService, OptionService, NotificationService) {
    var vm = this;
    vm.question = new QuestionService.Question();
    vm.options = [];

    activate();

    vm.hide = function() {
      $mdDialog.hide();
    };
    vm.cancel = function() {
      $mdDialog.cancel();
    };

    function activate(){

    }
  }
})();
