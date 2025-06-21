(function(){
'use strict';
angular.module('app').controller('LoginCtrl',LoginCtrl);
LoginCtrl.$inject=['AuthService','$state'];
function LoginCtrl(AuthService,$state){
var vm=this; vm.user={email:'',password:''}; vm.error='';
vm.login=function(){
AuthService.login(vm.user.email,vm.user.password)
.then(function(){ $state.go('products'); })
.catch(function(err){ vm.error=err; });
};
}
})();