(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .directive('sideNav', sideNav);

  /** @ngInject */
  function sideNav() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/side-nav/sidenav.html',
      scope: {

      },
      controller: SideNavController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SideNavController($mdSidenav, $log, $mdDialog, FirebaseDataService) {
      var vm = this;

      vm.close = function () {
        $mdSidenav('right').close();
      };

      vm.openNewQuestionDialog = function (ev) {
          $mdDialog.show({
              controller: "NewQuestionDialogController",
              controllerAs: "vm",
              templateUrl: 'app/components/question/new/new.question.dialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true
            })
            .finally(vm.close);
      };

      vm.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to reset the database?')
          .textContent('All data will be deleted permanently.')
          .targetEvent(ev)
          .ok('Yes, delete everything')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
          FirebaseDataService.reset();
        }).finally(vm.close);
      };
    }
  }

})();
