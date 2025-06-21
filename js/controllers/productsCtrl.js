(function(){
  'use strict';

  angular.module('app')
    .controller('ProductsCtrl', ProductsCtrl);

  ProductsCtrl.$inject = ['ProductService'];
  function ProductsCtrl(ProductService) {
    var vm = this;
    vm.products = [];
    vm.search ='';
    vm.sortKey = 'price';
    vm.reverse = false;
    vm.changeSort = function(key){
        if(vm.sortKey === key){
            vm.reverse = !vm.reverse;
        } else {
            vm.sortKey = key;
            vm.reverse = false;

        }
    };
    ProductService.getAll().then(function(data){ vm.products = data;});
  }
})();
