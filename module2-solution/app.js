(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.toBuyList();

  toBuy.boughtItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.boughtItem(itemIndex);
    } catch (error) {
      toBuy.errorMessage = error.message;
    }
  };
}

AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.alreadyBoughtList();
}

function ShoppingListCheckOffService() {
  var service = this;

  var alreadyBought = [];
  var toBuy = [
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

  service.boughtItem = function (itemIndex) {
    // captures which item is getting removed
    var moveItem = toBuy[itemIndex];
    // removes it
    toBuy.splice(itemIndex, 1);
    // adds it to the bought list at the end
    alreadyBought.push(moveItem);
    if (toBuy.length == 0) {
      // we are done. now throw the error message saying its empty
      throw new Error("Everything is bought!");
    }
  };

  service.toBuyList = function () {
    return toBuy;
  };

  service.alreadyBoughtList = function () {
      return alreadyBought;
  };

}

})();
