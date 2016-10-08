theApp.controller("ClientsController", function ($scope, $http) {
    var vm = this;
    vm.clients = [];

    getClients();

    function getClients() {
        var url = "http://spdev/_api/lists/GetByTitle('Clients')/Items?$select=id,Title";

        var clientIDs = [];
        $http.get(url).success(function (masterData) {

                var masterItems = masterData.d.results;

                //foreach refrence, get the master
                angular.forEach(masterItems, function (reference) {


                var nameArray = {
                    ID: reference.Id,
                    Name: reference.Title
                };

                vm.clients.push(nameArray);
            });
        });
    };
});