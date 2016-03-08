(function () {
    'use strict';

    angular
        .module('angularVoteApp')
        .directive('highchartsPie', highchartsPie);

    /** @ngInject */
    function highchartsPie() {
        var directive = {
            restrict: 'A',
            scope: {
                pieChartData: '='
            },
            controller: HighchartsController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs, vm) {
                var options = {
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: 'Pie chart visualization of votes'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Votes on option',
                        data: []
                    }]
                };

                element.highcharts(options);

                function render() {
                    var chart = element.highcharts();
                    chart.series[0].setData(vm.pieChartData);
                }

                render();

                scope.$on("render", render);
            }
        };

        return directive;

        /** @ngInject */
        function HighchartsController($mdDialog, VoteService, OptionService) {
            var vm = this;
        }
    }

})();
