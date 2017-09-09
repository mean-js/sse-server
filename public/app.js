var app = angular.module("app", ["ngMaterial"]);

app.controller("indexCtrl", ["$scope", function($scope) {
    console.log("Index Controller");

    var cardObj = {
        "title": "Affixus Sytstems Pvt Ltd",
        "ts": moment().toDate(),
        "bg": { "background-color": "#abc" }
    };
    $scope.refjson = {
        "cardList": [cardObj]
    }

    // let sseSocreUrl = `/score`;
    var sseSocreUrl = `http://192.168.0.104:3010/sse-api`;
    var source = new EventSource(sseSocreUrl);

    source.onmessage = function(event) {
        var newCardData = JSON.parse(event.data);
        $scope.refjson.cardList.splice(0, 0, newCardData);

        $scope.$apply(function() {
            console.log($scope.refjson);
        });
    };

    source.onerror = function(e) {
        console.log("EventSource failed.");
    };


}]);