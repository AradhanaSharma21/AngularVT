
app.controller('HomeController', function ($scope, $http, $rootScope, userService) {
    alert("Its my HomeController");
    $scope.controllerName = "Home wala ControllerName.."
    $scope.addAmount = "";

    $scope.AddAmount = function (addAmount) {
        
        
        $rootScope.UserDetail.Amount = (parseInt($rootScope.UserDetail.Amount) + parseInt(addAmount)).toString();
        userService.updateUser($rootScope.UserDetail).then(function (result) {
            alert("Your Balance Has been Updates Successfully!! Your Current Balance is: " + $rootScope.UserDetail.Amount);

        });
        alert("WIthin AddAmount Function!!");
    };
   
    $scope.user = [];
    $rootScope.UserDetail;
    $http.get("http://services.odata.org/TripPinRESTierService/People")
    .then(function (response) {
        $scope.user = response.data.value;

    });

    $scope.PrintDB = [];

    $http.get("http://localhost/innotym.api/odata/UserDetails")
    .then(function (response) {
        $scope.PrintDB = response.data.value;

    });

});



//app.controller('HomeController', function ($scope, Greet, myfactory, MyService, number) {
   
//    $scope.result = "";
//    console.log(Greet);
//    console.log(myfactory);
//    MyService.doIt();
//    console.log(number);
//    //$scope.CalcResult = function () {

//    //    if ($scope.Operation == 'Add') {
//    //        $scope.result = $scope.number1 + $scope.number2;
//    //    } else if ($scope.Operation == 'Substract') {
//    //        $scope.result = $scope.number1 - $scope.number2;
//    //    } else if ($scope.Operation == 'Multiply') {
//    //        $scope.result = $scope.number1 * $scope.number2;
//    //    } else if($scope.Operation == 'Divide') {
//    //        $scope.result = $scope.number1 / $scope.number2;
//    //    }


//    //}
//    $scope.Add = function () {
//        $scope.result = $scope.number1 + $scope.number2;
//    }
//    $scope.Sub = function () {
//        $scope.result = $scope.number1 - $scope.number2;
//    }
//    $scope.Mul= function () {
//        $scope.result = $scope.number1 * $scope.number2;
//    }
//    $scope.Div = function () {
//        $scope.result = $scope.number1 / $scope.number2;
//    }

    
    

//});