const app = angular.module("EmployeeMgmt", []);

app.controller("EmployeeCtrl", function($scope, $http) {
    $scope.title = "Reduce Employee Overhead"; 
    $scope.title2 = "Increase Employee Resources"; 
    
    const getEmployees = function () {
        $http
            .get("https://angularemployees.firebaseio.com/employees/.json")
            .then(response => {
                    $scope.employees = response.data
                    }
            )
    }

    $scope.hireEmployee = function () {
        $http
            .post(
                "https://angularemployees.firebaseio.com/employees/.json",
                ({
                    "firstName": $scope.newHire.firstName,
                    "lastName": $scope.newHire.lastName,
                    "employeeStart":Date.now(),
                    "employeeEnd":0
                })
            )
            .then(() => {
                $scope.newHire.firstName = ""
                $scope.newHire.lastName = ""
                getEmployees()
            })
        
    }
    $scope.fireEmployee = function (employee, key) {
        employee.employeeEnd = Date.now()

        $http
            .put(
                `https://angularemployees.firebaseio.com/employees/${key}/.json`,
                employee
            )
            .then(getEmployees)
        }
    $scope.silenceEmployee = function (employee, key) {
        employee.employeeEnd = Date.now()

        $http
            .delete(
                `https://angularemployees.firebaseio.com/employees/${key}/.json`,
                employee
            )
            .then(getEmployees)
        }

    getEmployees()

    })
