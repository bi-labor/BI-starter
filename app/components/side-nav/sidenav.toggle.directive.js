(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .directive('sideNavToggle', sideNavToggle);

  /** @ngInject */
  function sideNavToggle() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/side-nav/sidenav.toggle.html',
      scope: {

      },
      controller: SideNavToggleController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SideNavToggleController($mdSidenav) {
      var vm = this;

      vm.toggleRight = buildToggler('right');
      vm.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };

      function buildToggler(navID) {
        return function() {
          $mdSidenav(navID)
            .toggle();
        }
      }
    }
  }

})();
