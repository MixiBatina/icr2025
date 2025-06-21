(function(){
  'use strict';

  angular.module('app')
    .factory('CartService', CartService);

  function CartService() {
    var items = [];
    return {
      add: function(product) {
        var existing = items.find(i=>i.id===product.id);
        if (existing) existing.qty++;
        else items.push(angular.extend({ qty: 1 }, angular.copy(product)));
      },
      remove: function(id) {
        items = items.filter(i=>i.id!==id);
      },
      updateQty: function(id, qty) {
        var i = items.find(i=>i.id===id);
        if (i) i.qty = qty;
      },
      getItems: () => items,
      clear: () => items.splice(0, items.length)
    };
  }
})();