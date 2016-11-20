/**
 * Created by YG on 2016-11-18.
 */

angular.module('tp2.memo',[])

    .controller("MemoController" , MemoController);

function MemoController($scope, $http, $rootScope, Service) {

    // On scope le service
    $scope.Service = Service;

    // Une liste dummy de memos qui sera remplacé par les memos de l'utilisateur.
    $scope.listememos = Service.memos;
    // Contenu du memo a changer ( Ceci est sont initialisation par défault)
    $scope.memoCourant = $scope.listememos[0];
    $scope.memoContenu = $scope.listememos[0].memoContenu;
    $scope.memotitre = $scope.listememos[0].titrememo;
    // Va changer l'affichage du memo courant et le memo courant lui même
    $scope.setMemo = function (memoId) {
        $scope.memoCourant = $scope.listememos[memoId];
        $scope.memotitre = $scope.memoCourant.titrememo;
        $scope.memoContenu = $scope.memoCourant.memoContenu;
    };
    // Méthode qui fait le update d'un memo courant.
    $scope.addOrUpdateMemo = function () {
        Service.addOrUpdateMemo($scope.memoCourant.id,$scope.memoContenu);
    };


    // On se mets un watch sur les memos du service pour ajuster notre scope!
    $scope.$watch('Service.memos', function (newVal, oldVal, scope) {
        if(newVal) {
            $scope.listememos = Service.memos;
        }
    });
}
