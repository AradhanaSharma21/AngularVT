app.controller('LoginController', function ($scope, $rootScope, userService, $location) {
    //alert("Its my LoginController");
    //$scope.message= "This is an example for ng-bind";
    //$scope.sum = 10;
    
    //$scope.increment = function () {
    //    $scope.sum = $scope.sum + 10;
    //}



    //$scope.controllerName = "Login wala ControllerName.."
    //$rootScope.msg = "This is root scope";

    $scope.ShowLogin = true;
    $scope.ShowRegister = false;
    $scope.invalidAlert = false;
    $scope.SuccessfulRegisterAlert = false;
    

    $scope.ShowRegisterPanel = function () {

        $scope.ShowLogin = false;
        $scope.ShowRegister = true;
        $scope.invalidAlert = false;

    }

    $scope.ShowLoginPanel = function () {

        $scope.ShowLogin = true;
        $scope.ShowRegister = false;
        $scope.SuccessfulRegisterAlert = false;

    }


    $scope.loginData = {};
    $scope.registerData = {};
    $rootScope.UserDetail = {};
    //$scope.loin = function () {
    //    $scope.loginData;

    //}

    $scope.login = function () {
        userService.getUsers().then(function (result) {
            $scope.users = result.data.value;
            var status = 1;

            angular.forEach($scope.users, function (value, key) {
                
                if (value.Email == $scope.loginData.Email && value.Passwords == $scope.loginData.Pass)
                {
                    alert("login Successful");
                    $rootScope.UserDetail = value;
                    $location.path('/TransactionList');
                    status = 2;
                    $scope.invalidAlert = false;
                    $scope.SuccessfulRegisterAlert = false;
                }
                else if (($scope.users.length - 1) == key && status == 1) {
                    alert("Login failed");
                    $scope.invalidAlert = true;
                    $scope.SuccessfulRegisterAlert = false;
                }
            });

        }, function (error) {
            alert(error);
        });
    }

    $scope.register = function () {
        userService.createUsers($scope.registerData).then(function (result) {
            alert("Registration Successful");
            $scope.SuccessfulRegisterAlert = true;
            $scope.invalidAlert = false;
            $scope.registerData = {};
            $rootScope.UserDetail = result.data.value;
        }, function (error) {
            alert("Register Failed");
        });
        
    }



});