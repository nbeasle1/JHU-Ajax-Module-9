(function () {

    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/');
    
        $stateProvider
    
            .state('home', {
                url: '/',
                templateUrl: '../templates/home.template.html'
            })
    
            .state('categories', {
                url: '/categories',
                templateUrl: '../templates/categories.template.html',
                controller: 'CategoriesComponentController',
                controllerAs: 'catCtrl',
                resolve: {
                    categorieslist: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            
            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: '../templates/items.template.html',
                controller: 'ItemsComponentController',
                controllerAs: 'itemCtrl',
                resolve: {
                    itemslist: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
    }
})();
