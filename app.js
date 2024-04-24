(function () {

    'use strict';

    // menuapp module (menuapp.module.js)
    angular.module('MenuApp', ['ui.router', 'data']);

    // data module (data.module.js)
    angular.module('data', []);

    // menudata service (menudata.service.js)
    angular.module('data')
    .service('MenuDataService', MenuDataService)

    // register the controller for categories
    angular.module('MenuApp')
    .controller('CategoriesComponentController', CategoriesComponentController)

    //register the controller for items
    angular.module('MenuApp')
    .controller('ItemsComponentController', ItemsComponentController)

    // home component (home.component.js)
    angular.module('MenuApp')
    .component('homeComponent', {
        templateUrl: 'templates/home.template.html'
    })

    // categories component (categories.component.js)
    angular.module('MenuApp')
    .component('categoriesComponent', {
        templateUrl: 'templates/categories.template.html',
        controller: CategoriesComponentController,
        bindings: {
            categorieslist: '<'
        }
    });

    // items component
    angular.module('MenuApp')
    .component('itemsComponent', {
        templateUrl: 'templates/items.template.html',
        controller: ItemsComponentController,
        bindings: {
            itemslist: '<'
        }
    })

    // routing
    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'templates/home.template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.template.html',
                controller: 'CategoriesComponentController',
                controllerAs: 'list',
                resolve: {
                    categorieslist: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            
            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: 'templates/items.template.html',
                controller: 'ItemsComponentController',
                controllerAs: 'list',
                resolve: {
                    itemslist: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
    }

    MenuDataService.$inject = ['$http']
    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json'
            })
            .then(
                function (result) {
                    console.log(result.data);
                    return result.data;
                }
            )
        }

        service.getItemsForCategory = function (categoryShortName) {
            $rootScope.$broadcast('items.loaded', {on: true});
            return $http({
                url: `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}.json`
            })
            .then(
                function (result) {
                    console.log(result.data);
                    console.log("hitting items for category")
                    $rootScope.$broadcast('items.loaded', {on: false});
                    return result.data;
                }
            )
        }
    }

    // categories component controller
    CategoriesComponentController.$inject = ['categorieslist']
    function CategoriesComponentController(categorieslist) {
        var categories = this;

        categories.categorieslist = categorieslist;
    }

    // items component controller
    ItemsComponentController.$inject = ['itemslist']
    function ItemsComponentController(itemslist) {
        var items = this;

        items.itemslist = itemslist;
    }


})();
