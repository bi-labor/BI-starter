(function () {
  'use strict';

  angular
    .module('angularVoteApp')
    .controller('StatisticsController', StatisticsController);

  /** @ngInject */
  function StatisticsController($mdDialog, VoteService, OptionService, $stateParams, QuestionService, $rootScope, $scope) {
    var vm = this;

    vm.question = null;

    vm.votes = null;
    vm.options = null;

    vm.votesMap = null;

    vm.pieChartData = null;
    vm.columnChartData = null;

    activate();

    vm.hide = function () {
      $mdDialog.hide();
    };
    vm.cancel = function () {
      $mdDialog.cancel();
    };
    vm.answer = function (answer) {
      $mdDialog.hide(answer);
    };

    function activate() {
      QuestionService.getQuestionById($stateParams.id).$loaded().then(function (question) {
        vm.votesMap = {};
        vm.question = question;

        vm.votes = VoteService.getVotesToQuestion(vm.question);
        vm.options = OptionService.getOptionsToQuestion(vm.question);



        vm.votes.$loaded().then(function (votes) {
          var groupedVotes = _.groupBy(vm.votes, "option");

          _.forEach(vm.options, function (option) {
            vm.votesMap[option.label] = [];
          });

          _.merge(vm.votesMap, groupedVotes);

          vm.votes.$watch(function (event, x) {
            var latestVote = vm.votes[vm.votes.length - 1];
            var optionVotes = vm.votesMap[latestVote.option];
            optionVotes.push(latestVote);

            updateCharts();
          });

          updateCharts();
        });

        function updateCharts(){
          generatePieChartData();
          generateColumnChartData();

          $scope.$broadcast("render",vm.votesMap);
        }

        function generatePieChartData() {
          vm.pieChartData = [];

          _.forEach(vm.votesMap, function (key, value) {
            vm.pieChartData.push(
                {
                  name: value,
                  y: key.length
                }
            );
          });

        }

        function generateColumnChartData(){
          vm.columnChartData = {};

          vm.columnChartData.categories = _.keys(vm.votesMap);
          vm.columnChartData.data = _.map(vm.votesMap, function (item) {
            return item.length;
          });
        }
      });
    }
  }
})();
