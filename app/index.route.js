(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/question/questions.html',
        controller: 'QuestionsController',
        controllerAs: 'vm'
      });

    $stateProvider
      .state('statistics', {
        url: '/statistics/:id',
        templateUrl: 'app/components/statistics/statistics.html',
        controller: 'StatisticsController',
        controllerAs: 'vm'

      });

    $urlRouterProvider.otherwise('/');
  }

})();
