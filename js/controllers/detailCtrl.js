(function(){
    'use strict';
angular
    .module('app')
    .factory('DataService', DataService)
    .controller('DetailController', DetailController);

    DataService.$inject = ['$resource'];
    function DataService($resource) {
        return $resource('data/mock.json', {}, {
            query: { method: 'GET', isArray: true },
            get: { method: 'GET' }          
        });
    };
    DetailController.$inject = ['$stateParams','DataService'];
    function DetailController($stateParams, DataService){
        var vm = this;
        vm.item = {};
        var id = $stateParams.id;
        DataService.get({id: id}).$promise.then(function(data){
            vm.item = data;
        });
    }
   
})();
