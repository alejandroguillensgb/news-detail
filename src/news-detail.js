'use strict';

angular.module('news-detail', ['megazord'])
    .controller('news-detail-controller', ['$scope', '_router', '_screen', '_screenParams', '_data','$ionicNavBarDelegate','$ionicHistory','$localStorage','lodash','localStorageService',
     function ($scope, _router, _screen, _screenParams, _data, $ionicNavBarDelegate, $ionicHistory, $localStorage, _, localStorageService) {
        _screen.initialize($scope, _screenParams);
        $scope.data = _data.data; 
        $ionicNavBarDelegate.showBackButton(false);
        $scope.goBack = function() {
        	if ($ionicHistory.backView()) {
        		$ionicHistory.goBack(); 
        	} else {
        		$ionicHistory.nextViewOptions({
        			historyRoot:true
        		}); 
        		_router.fireEvent({
        			name: 'goToMain'
        		}); 
        	}
        }

        //LocalStorageModule
        $scope.bookmark = function(data) {
        	var keys = localStorageService.keys(); 
        	if (keys.indexOf(data.uuid)==-1) {
        		localStorageService.set(data.uuid, data); 
        	} else {
        		localStorageService.remove(data.uuid); 
        	}
            $scope.isBookmarked = !$scope.isBookmarked;    
        }

        function checkBookmark(data) {
            var keys = localStorageService.keys(); 
            return (keys.indexOf(data.uuid)!=-1);
        }

        $scope.isBookmarked = checkBookmark($scope.data); 

        //Add your controller logic here.
    }]);