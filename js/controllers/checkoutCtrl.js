(function(){
  'use strict';

  angular.module('app')
    .controller('CheckoutCtrl', CheckoutCtrl);

  CheckoutCtrl.$inject = ['CartService'];
  function CheckoutCtrl(CartService) {
    var vm = this;
    vm.order = { name:'', address:'', email:'' };
    vm.items = CartService.getItems();
    vm.submit = function(form) {
      if (form.$valid) {
        alert('Order placed!'); 
        CartService.clear();
      }
    };
  }
})();
