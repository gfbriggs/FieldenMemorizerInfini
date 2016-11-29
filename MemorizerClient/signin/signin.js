/**
 * Created by Geoffrey on 11/20/2016.
 */
angular.module('tp2.signin',[]).controller("SignInController", SignInController);

function SignInController($scope,Service,$location) {

    $scope.email = "";
    $scope.password= "";

    // On fait le log
    $scope.login = function () {
        Service.login($scope.email,$scope.password);

    }
}