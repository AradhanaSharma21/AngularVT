app.controller('TransactionController', function ($scope, $rootScope, $location, TransactionService, userService) {

    alert("Hurrrraayyy!!!..TransactionController.");
    $scope.transactionList = [];
    $scope.users = [];
    $scope.transactionData = {};
    $scope.debitUserInitialAmount = {};
    $scope.debitUserDetails = {};



    $scope.getTransaction = function () {

        var filter = "&$filter=";
        filter = filter + "UserId eq " + $rootScope.UserDetail.UserId;


        TransactionService.getTransactions(filter).then(function (results) {
            $scope.transactionList = results.data.value;
        }, function (error) {
            alert(error);
        });


    }



    $scope.doTransaction = function () {
    
        if (parseFloat($scope.transactionData.Amount) <= parseFloat($rootScope.UserDetail.Amount)) {
            //debit transaction
            $scope.debitUserInitialAmount = $rootScope.UserDetail.Amount; //to store Initial Amount in transaction table
            $rootScope.UserDetail.Amount = (parseFloat($rootScope.UserDetail.Amount) - parseFloat($scope.transactionData.Amount)).toString();
            $scope.debitUserDetails = $rootScope.UserDetail;

            //service call to debit amount
            userService.updateUser($scope.debitUserDetails).then(function () {
                
                //credit transaction
                $scope.creditUserInitialAmount = $scope.transactionData.refUser.Amount;
                $scope.transactionData.refUser.Amount = (parseFloat($scope.transactionData.refUser.Amount) +
                    parseFloat($scope.transactionData.Amount)).toString();
                $scope.creditUserDetails = $scope.transactionData.refUser;

                //service call to credit amount

                userService.updateUser($scope.creditUserDetails).then(function (result) {

                    //entry in transaction table for debit
                    $scope.debitTransactionDetails = {
                        UserId : $rootScope.UserDetail.UserId,
                        RefId : $scope.transactionData.refUser.UserId,
                        TransType : "Debit",
                        InitialAmount : $scope.debitUserInitialAmount.toString(),
                        Amount : $scope.transactionData.Amount.toString()

                    }
                    TransactionService.createTransaction($scope.debitTransactionDetails).then(function (result) {
                      
                        //entry in transaction table for credit
                        $scope.CreditTransactionDetails = {
                            UserId: $scope.transactionData.refUser.UserId,
                            RefId: $rootScope.UserDetail.UserId,
                            TransType: "Credit",
                            InitialAmount: $scope.creditUserInitialAmount.toString(),
                            Amount: $scope.transactionData.Amount.toString()

                        }

                        TransactionService.createTransaction($scope.CreditTransactionDetails).then(function (result) {

                            alert("Update done in Transaction table!!");
                            $location.path('/TransactionList');

                        }, function (error) {
                            alert(error);
                        });

                    },function (error) {
                        alert(error);
                    });


                }, function (error) {
                    alert(error);
                });


            
            }, function(error){
                alert(error);
            });





            alert("Done!!");
        }
        else {
            alert("Sorry!! you don't have sufficient Amount in your Account.");

        }


    };

    
    

    $scope.getTransactionUsers = function () {

        var filter = "?$filter=";
        filter = filter + "UserId ne " + $rootScope.UserDetail.UserId;
        userService.getUsers(filter).then(function (results) {
            $scope.users = results.data.value;

        }, function (error) {
            alert(error);
        });

    }

});