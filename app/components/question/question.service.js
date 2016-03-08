(function() {
  'use strict';

  angular
    .module('angularVoteApp')
    .factory('QuestionService', QuestionService);

  /** @ngInject */
  function QuestionService($firebaseArray, FirebaseDataService, OptionService, $firebaseObject) {
    var questions = null;

    var service = {
      Question: Question,
      Vote: Vote,
      getQuestions: getQuestions,
      getQuestionById: getQuestionById,
      addQuestion: addQuestion,
      removeQuestion: removeQuestion
    };

    init();

    return service;

    function init(){
      questions = $firebaseArray(FirebaseDataService.questions);
    }

    function Question(){
      this.title = '';
      this.description = '';
      this.imageUrl = '';
      this.createdAt = null;
    }

    function Vote(){
      this.voter = '';
      this.createdAt = null;
    }

    function getQuestions(){
      return questions;
    }

    function getQuestionById(id){
      return $firebaseObject(FirebaseDataService.questions.child(id));
    }

    function addQuestion(question){
      question.createdAt = (new Date()).getTime();
      return questions.$add(question);
    }

    function removeQuestion(question){
       return questions.$remove(question);
    }

  }

})();
