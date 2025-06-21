(function () {
    angular
        .module('app')
        .controller('ListController', ListController);
    ListController.$inject = ['$http'];
    function ListController($http) {
        var vm = this;
        vm.items = [];

        $http.get('data/mock.json').then(function (res) {
            vm.items = res.data;

        });
    }
})();
(function () {
    ListController.$inject = ['DataService', '$uibModal'];
    var vm = this;
    vm.items = [];
    DataService.query().$promise.then(data => vm.items = data);
    vm.openDetail = function (item) {
        $uibModal.open({
            templateUrl: 'templates/modal.html',
            controller: 'ModalController',
            controllerAs: 'nvm',
            resolve: { item: () => item }

        });
    }
});
(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl)
    .controller('AgentChatCtrl', AgentChatCtrl);
  MainCtrl.$inject = ['AuthService', '$uibModal', '$state'];
  function MainCtrl(AuthService, $uibModal, $state) {
    var vm = this;

    vm.isLoggedIn   = AuthService.isLoggedIn;
    vm.currentUser  = AuthService.getCurrent;
    vm.logout       = logout;
    vm.openChat     = openChat;

    function logout() {
      AuthService.logout();
      $state.go('home');
    }

    function openChat() {
      $uibModal.open({
        templateUrl: '/templates/agent-chat.html',
        controller:  'AgentChatCtrl',
        controllerAs:'chat',
        size:         'md',
        backdrop:     'static'
      });
    }
  }

  AgentChatCtrl.$inject = ['$uibModalInstance'];
  function AgentChatCtrl($uibModalInstance) {
    var chat = this;
    chat.messages  = [
      { from: 'agent', text: 'Hello! How can I assist you today?' },
      { from: 'agent', text: 'Feel free to browse our products or ask for help.' }
    ];
    chat.userInput = '';
    chat.send      = send;
    chat.close     = close;

    function send(form) {
      if (form.$valid) {
        chat.messages.push({ from: 'user',  text: chat.userInput });
        chat.messages.push({ from: 'agent', text: 'You said: ' + chat.userInput });
        chat.userInput = '';
        form.$setPristine();
      }
    }

    function close() {
      $uibModalInstance.dismiss();
    }
  }
})();

