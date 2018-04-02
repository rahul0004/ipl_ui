var app = angular.module("ipl");

app.controller("ModalCtrl", function($scope, $uibModalInstance, selectedPlayer){

    $scope.selectedPlayer = angular.copy(selectedPlayer);

    $scope.ok = function () {
        $uibModalInstance.close($scope.selectedPlayer);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});