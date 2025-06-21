(function() {
  'use strict';

  angular
    .module('app')
    .controller('ModalController', ModalController);

  ModalController.$inject = ['$uibModalInstance','item'];
  function ModalController($uibModalInstance, item) {
    var mvm = this;
    mvm.item = item;

    mvm.close = function() {
      $uibModalInstance.dismiss();
    };
  }
})();