angular.module('starter.controllers', [])

.controller('loginCtrl', ['$scope', '$http','$cordovaToast','$location', function($scope, $http, $cordovaToast, $location) {
  $scope.reg_show = false;
  $scope.login_show = true;  
  $scope.validate = function(){
  	$scope.data = {
  		user: $scope.username,
  		pass: $scope.password
  	}
  	if ($scope.username && $scope.password != undefined){
  		console.log("inside AJAX call");
  		window.location.assign("home.html");
  		/*$.ajax({
		url : 'http://localhost/mysite/php/login_authentication.php',
		type : 'POST',
		data : $scope.data,
		success : function(response){
			console.log(response);			
		} 	
	});*/
  	}
  	else if ($scope.username == undefined) {
  		//console.log("Please provide the username");
  		//$cordovaToast.show('Invalid Username', 'short', 'bottom');  		

  	}
  	else if ($scope.password == undefined){
  		console.log("Please provide the password");
  		//$cordovaToast.show('Invalid Password', 'short', 'bottom');
  	}
  	console.log($scope.data);

  	

  };
  $scope.go2register = function(){
  	$scope.login_show = false;
  	$scope.reg_show = true;
  }

}])

.controller('MapCtrl', function($scope, $http, $state) {
  $scope.hotels = [];
  $http.get("http://localhost/mysite/php/hotel.data.php")
    .success(function (response) {$scope.hotels = response.records;});
      console.log($scope.hotels);

  $scope.showOnMap = function(lat, lng){
    console.log(lat, lng);
    $scope.map = {center: {latitude: lat, longitude: lng }, zoom: 14 };
    $scope.options = {scrollwheel: false};
    $scope.myLatLng = {lat: lat, lng: lng};
    console.log($scope.map);
    
    $state.go('app.mapview');
  }

});




angular.module('home.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$http) {
  $scope.items = [];
  $http({
  method: 'GET',
  url: 'http://localhost/mysite/php/dish_data.php' 
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response)
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log('Err'+ response)
  });

	$scope.doRefresh = function(){
		$http.get("http://localhost/mysite/php/dish_data.php")
    .success(function (response) {$scope.items = response.records;});
      console.log($scope.items);

		

	};
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('HotelCtrl', function($scope, $http, $state) {
  $scope.hotels = [];
  $http.get("http://localhost/mysite/php/hotel.data.php")
    .success(function (response) {$scope.hotels = response.records;});
      console.log($scope.hotels);

  $scope.showOnMap = function(lat, lng){
    console.log(lat, lng);
    document.cookie = "lat = "+lat;
    document.cookie = "lng = "+lng;
    console.log(document.cookie);
    $state.go('app.mapview');
  }
})

.controller('MapCtrl', function($scope, $stateParams) {
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
  };
  var latLng = new google.maps.LatLng(getCookie("lat"), getCookie("lng"));
    var mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions); 
    console.log($scope.map);

})



