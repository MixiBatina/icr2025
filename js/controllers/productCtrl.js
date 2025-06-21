(function(){
  'use strict';

  angular.module('app')
    .controller('ProductCtrl', ProductCtrl);

  ProductCtrl.$inject = ['$stateParams','ProductService','CartService','AuthService'];
  function ProductCtrl($stateParams, ProductService, CartService, AuthService) {
    var vm = this;
    vm.id = $stateParams.id;
    vm.product = {};
    vm.reviewText = '';
    ProductService.get(vm.id).then(data => vm.product = data);
    vm.addToCart = () => CartService.add(vm.product);
    vm.leaveReview = function () {
      if (AuthService.isLoggedIn()) {
        var rev = AuthService.leaveReview(vm.id, vm.reviewText);
        vm.product.reviews = vm.product.reviews || []; vm.product.reviews.push({ user: AuthService.getCurrent().fullName, text: rev.text, date: rev.date }); vm.reviewText = '';
      }
      else alert('Please login to leave review');
    };
  }
})();

