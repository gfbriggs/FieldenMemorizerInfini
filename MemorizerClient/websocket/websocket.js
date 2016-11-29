/**
 * Created by Geoffrey on 11/26/2016.
 */
// Module pour les websockets
angular.module('tp2.websocket', [])

    .controller('WebCtrl', function($scope) {
        $scope.socket = new WebSocket('ws://localhost:8181');
        $scope.conversation = [];
        $scope.socket.onmessage = function(mess) {
            $scope.conversation.push(mess.data);
            $scope.$apply();
        };
        $scope.sendMessage = function() {
            $scope.socket.send($scope.message);
        }
    });