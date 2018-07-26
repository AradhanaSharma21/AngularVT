app.factory('userService', function ($http) {

    var userServiceFactory = {};

    //function to get user (Existing user verification)


    userServiceFactory.getUsers = function (filter) {

        if (!filter)
            filter = "";
        return $http.get("http://localhost/innotym.api/odata/UserDetails" + filter);
    }

    //function to create user
    userServiceFactory.createUsers = function (model) {
        return $http.post("http://localhost/innotym.api/odata/UserDetails", model);
    }

    //funtion to update user
    userServiceFactory.updateUser = function (model) {
        return $http.put("http://localhost/innotym.api/odata/UserDetails(" + model.UserId + ")", model);
    };

    //funtion to Delete user
    userServiceFactory.DeleteUser = function (id) {
        return $http.delete("http://localhost/innotym.api/odata/UserDetails(" + id + ")");
    };



    return userServiceFactory;

});