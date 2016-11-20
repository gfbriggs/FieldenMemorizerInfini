angular.module('tp2', ['ngRoute','tp2.memo','Service'])
    .config (['$routeProvider', function($routeProvider){
        $routeProvider.when('/memo', {
            templateUrl: 'memo/memo.html',
            controller : 'MemoController'
        });
        $routeProvider.when('/', {
            templateUrl: 'memo/memo.html',
            controller : 'MemoController'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        
    }]);
    // Voici mon module de service qui va effectuer tout les méthodes de service :)))
    angular.module('Service', [])
    .service('Service', function () {

        // La liste de base de test pour le mock de l'application
        this.memos = [{id: 0, titrememo: "Memo1", memoContenu: "Ceci est le memo1"},
            {id: 1, titrememo: "Memo2", memoContenu: "Ceci est le memo2"},
            {id: 2, titrememo: "Memo3", memoContenu: "Ceci est le memo3"}];
        // Méthode qui fait la mise a jour d'un memo
        this.addOrUpdateMemo = function (memo, contenu) {
            this.memos[memo].memoContenu = contenu;
        };

        // Méthode qui ajoute un memo à la liste.
        this.addMemo  = function (titreMemo,ContenuMemo) {
            memo = { id:this.memos.length , titrememo: titreMemo , memoContenu : ContenuMemo};
            this.memos.push(memo);
        }
    });





