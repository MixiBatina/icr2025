(function () {
'use strict';

angular.module('app')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['ProductService', 'AuthService'];
function HomeCtrl(ProductService, AuthService) {
var vm = this;
vm.recommendations = [];
vm.userFavorites = AuthService.getCurrent() ? AuthService.getCurrent().favorites : [];
ProductService.getAll().then(function (products) {
  if (vm.userFavorites.length) {
    vm.recommendations = products.filter(function (p) {
      return vm.userFavorites.indexOf(p.type) !== -1;
    });
  }
});

}
})();