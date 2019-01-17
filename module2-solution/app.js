(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = [
    {
      name: "cookies",
      quantity: "2"
    },
    {
      name: "chips",
      quantity: "3"
    },
    {
      name: "yogurt",
      quantity: "2"
    },
    {
      name: "sandwiches",
      quantity: "5"
    },
    {
      name: "drinks",
      quantity: "8"
    }
  ];

  toBuy.boughtItem = function (itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex); //toBuy.items[itemIndex]
  };

}


AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought = [""];



}


// Also, realize that your service will have to keep track of both 'to buy' and 'bought' items at the same time.
function ShoppingListCheckOffService() {
  var service = this;

  var toBuy = [""];
  var alreadyBought = [""];

  service.boughtItem = function (itemIndex) {
    // captures which item is getting removed
    var moveItem = toBuy.splice(itemIndex, 1);
    // adds it to the bought list at the end
    alreadyBought.push(moveItem);
  };



}




})();
