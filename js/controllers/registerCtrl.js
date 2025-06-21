(function(){
'use strict';
angular.module('app').controller('RegisterCtrl',RegisterCtrl);
RegisterCtrl.$inject=['AuthService','$state'];
function RegisterCtrl(AuthService,$state){
var vm=this; vm.user={fullName:'',email:'',password:'',phone:'',address:'',favorites:''}; vm.error='';
vm.register=function(){
AuthService.register(vm.user)
.then(function(){ $state.go('login'); })
.catch(function(err){ vm.error=err; });
};
}
})();