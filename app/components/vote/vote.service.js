(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .factory('VoteService', VoteService);

  /** @ngInject */
  function VoteService($firebaseArray, FirebaseDataService) {
    var votes = null;

    var service = {
      Vote: Vote,
      getVotesToQuestion: getVotesToQuestion,
      getVotesToQuestionId: getVotesToQuestionId
    };

    init();

    return service;

    function init(){
      votes = $firebaseArray(FirebaseDataService.votes);
    }

    function Vote(){
      this.option = '';
      this.createdAt = null;
    }

    function getVotesToQuestion(question){
      return $firebaseArray(FirebaseDataService.votes.child(question.$id));
    }

    function getVotesToQuestionId(id){
      return $firebaseArray(FirebaseDataService.votes.child(id));
    }

    //TODO: Implement addVoteToQuestion function
  }

})();
