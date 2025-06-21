(function(){
  'use strict';

  angular.module('app')
    .controller('AgentChatCtrl', AgentChatCtrl);

  function AgentChatCtrl() {
    var chat = this;
    chat.messages = [
      { from:'agent', text:'Hello! How can I help?' },
    ];

    chat.send = function(inputForm) {
      if (!chat.userInput) return;
      chat.messages.push({ from:'user', text: chat.userInput });
      chat.messages.push({ from:'agent', text:'(predefined reply)' });
      chat.userInput = '';
      inputForm.$setPristine();
    };

    chat.close = function() {
      $uibModalInstance.dismiss();
    };
  }
})();