(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http']
    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json',
            })
            .then(
                function (result) {
                    console.log(result);
                }
            )
        }

        service.getItemsForCategory = function (categoryShortName) {

        }
    }
})