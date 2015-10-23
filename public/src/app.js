var app = angular.module('LocalVotingApp', []);

app.factory('DataService', function($q, $http) {
  return {
      getData: function() {
          var defer = $q.defer();
          $http.get('./src/mockData/candidates.json', { cache: 'true'})
          .success(function(data) {
              defer.resolve(data);
          });

          return defer.promise;
      }
  }

});

app.controller('MainController', function($scope, DataService) {
  $scope.voted = 'none';

  DataService.getData().then(function(data){
    $scope.candidates = data.candidates;
    $scope.candidates.forEach(function(element, index){
      element.index = index;
    });
  });

  $scope.changeVote = function(flag, iss) {

    if ($scope.voted == 'none') {
      if (flag == 'up') {
        iss.up++;
      } else {
        iss.down++;
      }
      $scope.voted = flag;
    } else {
      if ($scope.voted == 'up' && flag == 'up') {
        iss.up--;
        $scope.voted = 'none';
      } else if ($scope.voted == 'up' && flag == 'down') {
        iss.up--;
        iss.down++;
        $scope.voted = flag;
      } else if ($scope.voted == 'down' && flag == 'down') {
        iss.down--;
        $scope.voted = 'none';
      } else if ($scope.voted == 'down' && flag == 'up') {
        iss.up++;
        iss.down--;
        $scope.voted = flag;
      }
    }

  }

  $scope.newIssue = {};

  $scope.addNewIssue = function($event, index) {
    $scope.newIssue.up = 0;
    $scope.newIssue.down = 0;
    console.log($scope.candidates);
    console.log(index);
    $scope.candidates[index].issues.push($scope.newIssue);
    $scope.newIssue = {};
    $event.preventDefault();
  }
});
