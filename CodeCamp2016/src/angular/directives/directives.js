theApp.directive('clientsList', ['$http', '$uibModal', function ($http, $uibModal) {
    var listTitle = 'Clients';
    var html = '<div class="panel panel-primary panel-project-manager">' +
        '<div class="panel-heading">' +
            '<div class="row">' +
                '<div class="col-xs-11">' +
                    '<h3 class="panel-title" style="font-weight: 700;">{{companyname}}</h3>' +
                '</div>' +
                '<div style="text-align: right; padding-right: 20px;">' +
                    '<a style="color:white;" ng-click="customSelected = null; vm.editing = false; vm.matchingClient.length = 0; "><i class="glyphicon glyphicon-plus-sign" style="font-size:x-large"></i></a>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<table class="table table-striped table-condensed">' +
            '<thead>' +
                '<tr>' +
                    '<th>Name</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
                '<tr ng-repeat="Client in projectClients" class="clickable" style="cursor: pointer;" ng-click="currentProjectNotify = false; editing = true; editingProjectClientID = Client.ProjectClientID; selectClient(Client.ClientID, false)">' +
                    '<td>{{Client.Title}}</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="10000" ng-show="filteredProjects.length === 0">' +
                        'No Clients found' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</div>';

    function getClients() {
        var url = "~sitecollection/_api/lists/GetByTitle('" + listTitle + "')/Items?$select=ID,title&$orderby=title";

        $http.get(url).success(function (data) {
            angular.forEach(data.d.results, function (item) {
                var nameArray = { ClientID: item.ID, Name: item.Title };
                vm.mainClients.push(nameArray);
            });
        }).error(function (err) {
            logError(err.error.message.value);
        });
    };

    function selectClient(masterId, newProjectClient) {
        vm.matchingClient = [];

        var url = "~sitecollection/_api/lists/GetByTitle('" + listTitle + "')/Items(" + masterId + ")";
        url += "?$select=*";

        vm.editingProjectClientID;

        $http.get(url).success(function (data) {
            var item = data.d;
            vm.selectedClient = data.d;
            vm.etag = item.__metadata.etag;
            vm.Clientid = masterId;
            vm.currentProjectNotify = item.cipClientnotify;

            vm.selectedAcct = [];

            var dispText = '';
            var keyText = '';

            if (item.cipClientuseracctId !== null) {
                keyText = item.cipClientuseracct.Name;
                dispText = item.cipClientuseracct.Title;
                vm.selectedAcct = [{ DisplayText: dispText, Key: keyText }];
            }

            vm.matchingClient.push(masterId);

            if (!newProjectClient) {
                if (vm.editingProjectClientID !== undefined && vm.editingProjectClientID !== null) {
                    var urlLocal = "~site/_api/lists/GetByTitle('" + listTitleLocal + "')/Items(" + vm.editingProjectClientID + ")";

                    $http.get(urlLocal).success(function (data) {
                        var localItem = data.d;
                        vm.selectedClient.cipClientrole = localItem.cipClientrole;
                        vm.currentProjectNotify = localItem.cipClientnotify;
                    });
                }
            }
        });
    };

    function checkValidity(invalid) {
        if (invalid) {
            //if form is not valid set vm.submitted to true     
            vm.submitted = true;
        };
        return invalid;
    };

    function addClient(invalid) {
        if (checkValidity(invalid)) {
            return;
        };

        var acctKey = '';

        var qryPayload = {
            __metadata: {
                type: 'SP.Data.' + listTitle.replace(/ /g, '_x0020_') + 'ListItem'
            },

            Title: vm.selectedClient.Name
        };

        $http.post("~sitecollection/_api/lists/getbytitle('" + listTitle + "')/Items", qryPayload).success(function (data) {
            var item = data.d;
            vm.Clientid = item.ID;
            addProjectClient();
        }).error(function (err) {
            logError(err.error.message.value);
        });
    };

    function updateClient(invalid) {
        if (checkValidity(invalid)) {
            return;
        };

        var options = {};
        var acctKey = '';

        options.headers = {
            "X-Http-Method": "PATCH",
            "If-Match": vm.etag
        };

        var qryPayload = {
            __metadata: {
                type: 'SP.Data.' + listTitle.replace(/ /g, '_x0020_') + 'ListItem'
            },
            Title: vm.selectedClient.Name
        };

        var urlMaster = "~sitecollection/_api/lists/GetByTitle('" + listTitle + "')/Items(" + vm.Clientid + ")";

        $http.post(urlMaster, qryPayload, options).success(function (data) {
            //var item = data.d;
            //vm.etag = item.__metadata.etag;
        }).error(function (err) {
            logError(err.error.message.value);
        });

        var urlLocal = "~site/_api/lists/GetByTitle('" + listTitleLocal + "')/Items(" + vm.editingProjectClientID + ")";
    };

    //TODO: complete moving Client form to uibmodal
    function selectClient_new(masterId, newClient) {
        var templateLoc = "~sitecollection/Style%20Library/branding/templates/";
        var htmlFile, controller;

        var options = {
            templateUrl: templateLoc + "team-member.html",
            controller: "TeamMemberFormController"
        }

        var modalInstance = $uibModal.open({
            templateUrl: options.templateUrl,
            controller: options.controller,
            controllerAs: 'ctrlr',
            backdrop: 'static',
            //scope: $scope,
            windowClass: 'task-modal',
            resolve: {
                contractData: function () {
                    return {
                        ClientId: masterId
                    };
                }
            }
        });

        modalInstance.result.then(
            function () {

            },
            function () {
                //modal dismissed
            }
        );
    };

    return {
        restrict: 'E',
        templateUrl: '/Style%20Library/branding/templates/clients.html',
        controllerAs: "clientsCtrlr",
        scope: {
            name: '='
        },

        link: function ($scope, iElement, iAttrs, ngModelController) {
            getClients($scope);
        },

        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            $scope.clients = [];
        }]
    };
}]);
