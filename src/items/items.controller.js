(function () {
    'use strict';
    angular.module('MenuApp')
    .controller('ItemsComponentController', ItemsComponentController);

    ItemsComponentController.$inject = ['itemslist']
    function ItemsComponentController(itemslist) {
        var items = this;

        items.itemslist = itemslist;
    }
})();
