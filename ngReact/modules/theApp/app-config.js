﻿//initialize the angular app theApp
var theApp = angular.module('portalApp', ['ngMaterial', 'react']);

theApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$q', function ($q) {
        return {
            'request': function (config) {

                //set the default url to the site collection root
                var u = config.url;

                if (u.startsWith('~sitecollection')) {
                    config.url = u.replace('~sitecollection', 'http://spdev/sites/ngreact');
                }
                else if (u.startsWith('~site')) {
                    config.url = u.replace('~site', 'http://spdev');
                }

                u = config.url.toLowerCase();
                if ((u.indexOf('/_api/') > -1 || u.indexOf('/_vti_bin/') > -1 || u.indexOf('/api.aspx/') > -1) && config.method.toLowerCase() != "jsonp") {
                    //set some default options for going after sharepoint data
                    var spOptions = {
                        headers: {
                            'Accept': 'application/json;odata=verbose',
                            'Content-Type': 'application/json;odata=verbose'
                        }
                    };

                    if (config.method.toLowerCase() == 'post' || config.method.toLowerCase() == 'delete') {
                        UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
                        spOptions.headers["X-RequestDigest"] = jQuery("#__REQUESTDIGEST").val();
                    }
                    else if (config.method.toLowerCase() == 'get') {
                        //add data to get request, otherwise angular will remove content type header
                        config.data = '';
                    }

                    angular.merge(config, spOptions);
                }

                return config || $q.when(config);
            }

        }
    }]);
}]);
