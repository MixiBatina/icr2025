(function(){
'use strict';
angular.module('app').controller('ProfileCtrl',ProfileCtrl);
ProfileCtrl.$inject=['AuthService'];
function ProfileCtrl(AuthService){
var vm=this; vm.user=AuthService.getCurrent();
vm.update=function(){ AuthService.updateProfile(vm.user); vm.message='Profile saved'; };
}
})();