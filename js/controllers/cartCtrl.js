(function(){
  'use strict';

  angular.module('app')
    .controller('CartCtrl', CartCtrl);

  CartCtrl.$inject = ['CartService','$state'];
  function CartCtrl(CartService, $state) {
    var vm = this;
    vm.items = CartService.getItems();
    vm.remove = CartService.remove;
    vm.updateQty = CartService.updateQty;
    vm.total = () => vm.items.reduce((sum,i)=>sum + i.price*i.qty, 0);
    vm.checkout = () => $state.go('checkout');
  }
})();
