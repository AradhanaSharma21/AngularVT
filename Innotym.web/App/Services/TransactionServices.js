app.factory('TransactionService', function ($http) {
    var tansactionServiceFactory = {};
    //function to get transaction list
    tansactionServiceFactory.getTransactions = function (filter) {

        if (!filter)
            filter = "";
        return $http.get("http://localhost/innotym.api/odata/Transactions?$expand=UserDetail" + filter);
    }

    //funtion to create transaction
    tansactionServiceFactory.createTransaction = function (model) {
        return $http.post("http://localhost/innotym.api/odata/Transactions" , model);
    };

   
    return tansactionServiceFactory;
});