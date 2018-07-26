app.controller('HeaderController', function ($scope, $rootScope, $location, userService) {
    $scope.LogOut = function () {
        $scope.UserDetail = {};
        $location.path('/Login');

    }

    $scope.deleteUser = function () {
        userService.DeleteUser($rootScope.UserDetail.UserId).then(function (result) {
            alert("User Successfully Deleted!!");
            $location.path('/Login');

        });

    };


});