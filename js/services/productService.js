(function(){
  'use strict';

  angular.module('app')
    .factory('ProductService', ProductService);

  ProductService.$inject = ['$q'];
  function ProductService($q) {
    
    var products = [
      { id: 1, name: 'Artikal 1', price: 19.99, desc: 'Artikal a', img: 'img/a.jpg' },
      { id: 2, name: 'Artikal 2', price: 29.99, desc: 'Artikal b', img: 'img/b.jpg' },
    
    ];

    return {
      getAll: () => $q.resolve(angular.copy(products)),
      get: id => {
        var p = products.find(p=>p.id==id) || null;
        return $q.resolve(angular.copy(p));
      }
    };
  }
})();