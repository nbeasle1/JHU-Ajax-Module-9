(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService)

    MenuDataService.$inject = ['$http']
    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json'
            })
            .then(
                function (result) {
                    return result.data;
                }
            )
        }

        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                url: `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}.json`
            })
            .then(
                function (result) {
                    console.log(result.data)
                    return result.data;
                }
            )
        }
    }
})();