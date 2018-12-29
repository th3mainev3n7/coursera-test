(function () {
  'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.dishes = "";

  $scope.checkItems = function () {
    var count = 0;
    count = addUpDishes($scope.dishes);

    if ($scope.dishes == "") {
      $scope.message = "Please enter data first";
    }
    else if (count <= 3) {
        $scope.message = "Enjoy!";
    }
    else if (count > 3 ) {
      $scope.message = "Too much!";
    }
    else {
      $scope.message = "invalid input, you shouldn't have gotten here";
    }
  };

  // this adds up the total number of dishes
  function addUpDishes(string) {
    var arrayOfDishes = string.split(',');
    var totalDishesCount = arrayOfDishes.length;
    return totalDishesCount;
  }
}

})();
