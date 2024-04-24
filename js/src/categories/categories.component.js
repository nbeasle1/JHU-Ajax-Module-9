(function () {
    'use strict';

    angular.module('MenuApp')
    .component('categoriesComponent', {
        templateUrl: 'templates/categories.component.template.html',
        bindings: {
            categorieslist: '<'
        }
    });
    
})();