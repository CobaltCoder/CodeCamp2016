theApp.controller("ClientsController", ['$scope', '$http', function ($scope, $http) {
    var vm = this;
    vm.clients = [];
    vm.save = save;
    vm.getClients = getClients;
    listTitleLocal = 'Clients';

    getClients();

    function getClients() {
        var url = "~sitecollection/_api/lists/GetByTitle('" + listTitleLocal + "')/Items?$select=id,Title";

        var clientIDs = [];
        $http.get(url).success(function (masterData) {

                var masterItems = masterData.d.results;

                //foreach refrence, get the master
                angular.forEach(masterItems, function (reference) {
                    var nameArray = {
                        ID: reference.ID,
                        Name: reference.Title
                };

                vm.clients.push(nameArray);
            });
        });
    };

    function save(clientName) {
        var qryPayloadLocal = {
            __metadata: {
                type: 'SP.Data.' + listTitleLocal.replace(/ /g, '_x0020_') + 'ListItem'
            },
            Title: clientName,
        };

        $http.post("~sitecollection/_api/lists/getbytitle('" + listTitleLocal + "')/Items", qryPayloadLocal).success(function (data) {
            console.log('added client')
            var nameArray = {
                ID: data.d.ID,
                Name: clientName
        };
        vm.clients.push(nameArray);
    }).error(function (err) {
            consol.log(err.error.message.value);
        });

    };

}]);