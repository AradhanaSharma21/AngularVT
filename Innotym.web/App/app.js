var app = angular.module('InnotymApp', ['ngRoute']);
app.config(function ($routeProvider) {

    //Start Web Project

    $routeProvider.when("/Login", {
        controller: "LoginController",
        templateUrl: "App/Views/Login.html"
    });

    $routeProvider.when("/Home", {
        controller: "HomeController",
        templateUrl: "App/Views/Home.html"
    });

    $routeProvider.when("/DoTransaction", {
        controller: "TransactionController",
        templateUrl: "App/Views/DoTransaction.html"
    });

    $routeProvider.when("/TransactionList", {
        controller: "TransactionController",
        templateUrl: "App/Views/TransactionList.html"
    });
    $routeProvider.when("/AddMoney", {
        controller: "HomeController",
        templateUrl: "App/Views/AddMoney.html"
    });
    $routeProvider.otherwise({
        redirectTo: "/Login"
    });










});

//app.value("Greet", "Hiiee there!!!");


//app.factory("myfactory", function () {
//    return "MyFactory YoLo";
    
//});
//function myServices() {
//    this.doIt =function(){
//        console.log("Services done!!");
//    }
//}

//app.service("MyService", myServices);

//app.constant("number", 180796);
