(function () {
    'use strict';

    angular.module('MenuApp')
    .controller('CategoriesComponentController', CategoriesComponentController);

    CategoriesComponentController.$inject = ['categorieslist']
    function CategoriesComponentController(categorieslist) {
        var categories = this;

        categories.categorieslist = categorieslist;
    }

})();