angular.module("EmployeeApp")
.controller("AuthCtrl", function($scope, $location, AuthFactory) {
    $scope.auth = {}

    $scope.logOutUser = function () {
        AuthFactory.logout()
        $location.url('/auth')
    }

    $scope.logInUser = function () {
        AuthFactory.authenticate($scope.auth).then(function (didLogin) {
            $scope.login = {}
            $location.path("/employees/list")
        })
    }

    $scope.registerUser = function(registerNewUser) {
      AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
        logInUser(registerNewUser)
      })
    }

})