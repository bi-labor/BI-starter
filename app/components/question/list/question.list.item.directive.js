(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .directive('questionListItem', questionListItem);

  /** @ngInject */
  function questionListItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/question/list/question.list.item.directive.html',
      scope: {
        question: '='
      },
      controller: QuestionListItemController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function QuestionListItemController($mdDialog, VoteService, OptionService, QuestionService, NotificationService) {
      var vm = this;

      activate();

      vm.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this question?')
          .textContent('It will be removed permanently.')
          .targetEvent(ev)
          .ok('Yes, delete it')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          QuestionService.removeQuestion(vm.question);
        });
      };

      function activate(){

      }
    }
  }

})();
