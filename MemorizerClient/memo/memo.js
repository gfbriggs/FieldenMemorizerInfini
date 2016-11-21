/**
 * Created by YG on 2016-11-18.
 */

angular.module('tp2.memo',[])

    .controller("MemoController" , MemoController)
    .run(function (Service) {
    Service.memos();
});
function MemoController($scope, Service, $location) {

    // On scope le service

    $scope.Service = Service;
    $scope.memotitre = "Aucun selectioné!";
    $scope.memoContenu = "Aucun selectioné!";
    $scope.memoID = 0;
    // on mets des variables en attendant

    $scope.memoCourant = {Titre:"Aucun", Text:"Aucun", MemoID:0};
    // On get la liste de memo
    Service.memos();
    // Va changer l'affichage du memo courant et le memo courant lui même


    $scope.setMemo = function (MemoID) {
        Service.setMemo(MemoID);
    };

    // Méthode qui fait le update d'un memo courant.
    $scope.addOrUpdateMemo = function () {
        $scope.memoCourant.Text = $scope.memoContenu;
        Service.addOrUpdateMemo($scope.memoCourant);
    };

    $scope.updateinfo = function () {
      $scope.memotitre = $scope.memoCourant.Titre;
        $scope.memoContenu = $scope.memoCourant.Text;
    };
    // On se mets un watch sur les memos du service pour ajuster notre scope!
    $scope.$watch('Service.listememos', function (newVal, oldVal, scope) {
        if(newVal) {
            $scope.listememos = Service.listememos;
        }
    });

    $scope.$watch('Service.memo', function (newVal, oldVal, scope) {
        if(newVal) {
           $scope.memoCourant = Service.memo;
            $scope.updateinfo();
    }});

    $scope.addPage = function () {
       $location.path("/addmemo");
    }
}