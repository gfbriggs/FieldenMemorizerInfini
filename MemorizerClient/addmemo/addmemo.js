/**
 * Created by Geoffrey on 11/19/2016.
 */
angular.module('tp2.addmemo',[])   
    .controller("AddMemoController" , AddMemoController);

function AddMemoController($scope,$rootScope,Service)
{
    // Initialisation des variables du scope
    $scope.Service = Service;
    $scope.titrememo = "Le titre du memo";
    $scope.contenu = "Le contenu ici";

    // Méthode qui invoke la méthode de service pour ajouter un memo
    $scope.addMemo = function () {
        Service.addMemo($scope.titrememo,$scope.contenu);
    }
}