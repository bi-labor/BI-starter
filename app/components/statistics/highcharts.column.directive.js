(function () {
    'use strict';

    angular
        .module('angularVoteApp')
        .directive('highchartsColumn', highchartsColumn);

    /** @ngInject */
    function highchartsColumn($rootScope) {
        var directive = {
            restrict: 'A',
            scope: {
                columnChartData: "="
            },
            controller: HighchartsColumnController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs, vm) {

                function render() {

                }

                render();

                scope.$on("render", render);
            }
        };

        return directive;

        /** @ngInject */
        function HighchartsColumnController($mdDialog, VoteService, OptionService) {
            var vm = this;

        }
    }

})();
