angular
  .module('app')
  .factory('DataService', function() {
    var items = [mock.json];
    return {
      getAll: () => angular.copy(items),
      get: id => angular.copy(items.find(i => i.id == id)),
      update: updated => {
        var idx = items.findIndex(i => i.id == updated.id);
        if (idx>-1) items[idx]=angular.copy(updated);
      },
      delete: id => {
        var idx = items.findIndex(i=>i.id==id);
        if (idx>-1) items.splice(idx,1);
      }
    };
  });