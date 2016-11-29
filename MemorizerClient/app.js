angular.module('tp2', ['ngRoute','tp2.memo','tp2.addmemo','tp2.signin','tp2.websocket','Service'])
    .config (['$routeProvider', function($routeProvider){
        $routeProvider.when('/addmemo',{
           templateUrl: 'addmemo/addmemo.html',
            controller : 'AddMemoController'
        });
        $routeProvider.when('/memo', {  
            templateUrl: 'memo/memo.html',
            controller : 'MemoController'
        });
        $routeProvider.when('/', {
            templateUrl: 'signin/signin.html',
            controller : 'SignInController'
        });
        $routeProvider.when('/signin', {
            templateUrl: 'signin/signin.html',
            controller : 'SignInController'
        });
        $routeProvider.otherwise({
            redirectTo: '/signin',
            controller : 'SignInController'
        });
        $routeProvider.when('/websocket',{
           templateUrl:'websocket/websocket.html',
            controller:'WebCtrl'
        });

        
    }]);
    // Voici mon module de service qui va effectuer tout les méthodes de service :)))
    angular.module('Service', [])
    .service('Service', function ($http, $location, $timeout) {
          that = this;
          this.memo = {Titre:"", Text:"", MemoID:0};
          this.listememos = ["Memos"];
        this.TOKEN_KEY = "TOKEN";
        // La liste de base de test pour le mock de l'application
        this.memos = function () {
            $http({
                type:'GET',
                url :'http://localhost:3771/api/Memos/GetMemos',
                headers:{Authorization : 'Bearer ' + localStorage.getItem('Token')}
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                    that.listememos = response.data;
                console.log(response.data);

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
            // Fonction qui set le memocourant
            this.setMemo = function (MemoID) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:3771/api/Memos/GetMemo/'+MemoID,
                    headers:{Authorization : 'Bearer ' + localStorage.getItem('Token')}
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    that.memo = response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            };




        // Méthode qui fait la mise a jour d'un memo
        this.addOrUpdateMemo = function (memo) {
            // requete pour le update
            $http({
                method:'POST',
                url: 'http://localhost:3771/api/Memos/ChangeMemo',
                headers:{Authorization : 'Bearer ' + localStorage.getItem('Token')},
                data: memo
            });
        };

        // Méthode qui ajoute un memo à la liste.
        this.addMemo  = function (titreMemo,ContenuMemo) {
            this.memoAAjouter = { Titre: titreMemo , Text : ContenuMemo};
            var token = localStorage.getItem(that.TOKEN_KEY);
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
                console.log(headers.Authorization);
            }
            $http({
                method:'POST',
                url: 'http://localhost:3771/api/Memos/AddMemo/',
                headers: headers,
                data: this.memoAAjouter
            });
        };

        // Méthode de login
        this.login = function (email, password) {
            $.ajax({
                method: 'POST',
                url: 'http://localhost:3771/Token',
                data: {
                    grant_type: 'password',
                    username: email,
                    password: password
                },
                complete: function (response) {
                    console.log(response);
                    $timeout(function () {
                        if(response.status == 400)
                        {
                            alert("Mauvais log in!")
                        }
                        else
                        {
                            console.log(response.responseJSON.access_token);
                            localStorage.setItem( that.TOKEN_KEY , response.responseJSON.access_token);
                            $location.path('/memo');
                        }
                    });

                }
            });
        }
    });






