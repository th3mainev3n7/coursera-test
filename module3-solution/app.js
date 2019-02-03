(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

//--------------------------------------

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },

    controller: NarrowItDownController,
    controllerAs: 'myController',
    bindToController: true
  };

  return ddo;
}

//--------------------------------------

NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
function NarrowItDownController(MenuSearchService, $scope) {
  var controller = this;

  controller.narrowDown = function () {
    // call getMatchedMenuItems and store result in promise
    var promise = MenuSearchService.getMatchedMenuItems($scope.food);
    promise.then(function (response) {
      // take that response and set it to the found property on controller
      controller.found = response;
      console.log(response);
    })
    .catch(function (error) {
      console.log("something went wrong...");
    });
  };

  // remove an item
  controller.removeItem = function (itemIndex) {
    controller.found.splice(itemIndex, 1);
    // MenuSearchService.removeItem(itemIndex);
  };

}


//--------------------------------------

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  // var foundItems = [];
  //
  // service.removeItem = function (itemIndex) {
  //   foundItems.splice(itemIndex, 1);
  //   console.log(foundItems);
  // };

  service.getMatchedMenuItems = function (searchTerm) {
    // call http service here
    return $http({
          method: "GET",
          url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        }).then(function (menuObject) { // then take object that is returned

          var foundItems = [];

          // get it down to an array here
          var menu = menuObject.data.menu_items;

          // iterate through to see if the searchTerm is in the description
          for (var i = 0; i < menu.length; i++) {
            if (menu[i].description.includes(searchTerm)) {
              foundItems.push(menu[i]);
            }
          }

          return foundItems;
        })
        .catch(function (error) {
          console.log("an error has occurred");
        });
  };

}

  })();
