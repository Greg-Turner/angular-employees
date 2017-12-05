angular
.module("EmployeeApp")
.factory("EmployeeFactory", function ($http) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        },
        "list": {
            value: function () {
                return $http({
                    method: "GET",
                    url: "https://angularemployees.firebaseio.com/employees/.json"
                }).then(response => {
                    const data = response.data

                    this.cache = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })

                    return this.cache
                })
            }
        },
        "single": {
            value: function (key) {
                return $http({
                    method: "GET",
                    url: `https://angularemployees.firebaseio.com/employees/${key}/.json`
                }).then(response => {
                    return response.data
                })
            }
        },
        "blacklist": {
            value: function (key) {
                return $http({
                    method: "DELETE",
                    url: `https://angularemployees.firebaseio.com/employees/${key}/.json`
                })
            }
        },
        "fire": {
            value: function (employee, key) {
                employee.employmentEnd = Date.now()

                return $http({
                    method: "PUT",
                    url: `https://angularemployees.firebaseio.com/employees/${key}/.json`,
                    data: employee
                })
            }
        },
        "add": {
            value: function (employee) {
                return $http({
                    method: "POST",
                    url: "https://angularemployees.firebaseio.com/employees/.json",
                    data: {
                        "firstName": employee.firstName,
                        "lastName": employee.lastName,
                        "employmentStart": Date.now(),
                        "employmentEnd": 0
                    }
                })
            }
        }
    })
})