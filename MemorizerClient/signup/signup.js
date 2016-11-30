/**
 * Created by Geoffrey on 11/29/2016.
 */
angular.module('tp2.signup',[])
.controller("SignUpController",SignUpController);
function SignUpController($scope,Service,$location) {

    $scope.username = "";
    $scope.emailadress ="";
    $scope.passwordentry="";
    $scope.Service = Service;


    $scope.register = function () {
        Service.register($scope.username,$scope.emailadress,$scope.passwordentry);
        $location.path("/");
    }

}