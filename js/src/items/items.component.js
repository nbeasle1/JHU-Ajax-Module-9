(function () {
    'use strict';

    angular.module('MenuApp')
    .component('itemsComponent', {
        templateUrl: 'templates/items.component.template.html',
        bindings: {
            itemslist: '<'
        }
    })
    
})();