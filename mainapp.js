var app = angular.module("app", [ 'backand','ngRoute' ]);
app.config(function(BackandProvider,$routeProvider) {
	BackandProvider.setAppName('firstwebapp');
	BackandProvider.setSignUpToken('f80af7c5-783c-4589-ac54-91327befdd01');
	BackandProvider.setAnonymousToken('022db3d5-75b9-4cd0-866d-f74db15c6f39');

	$routeProvider.when('/', {
		templateUrl : 'html/login.html',
		controller : 'LoginController'
	}).when('/home', {
		templateUrl : 'html/home.html',
		controller : 'HomeController'
	}).when('/mobile', {
		templateUrl : 'html/mobile.html',
		controller : 'MobileController'
	}).when('/mines', {
		templateUrl : 'html/mines.html',
		controller : 'MinesController'
	});
});
app.run(function($rootScope,$timeout){
	
	});
var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
		menuRight = document.getElementById( 'cbp-spmenu-s2' ),
		menuTop = document.getElementById( 'cbp-spmenu-s3' ),
		menuBottom = document.getElementById( 'cbp-spmenu-s4' ),
		showLeft = document.getElementById( 'showLeft' ),
		showRight = document.getElementById( 'showRight' ),
		showTop = document.getElementById( 'showTop' ),
		showBottom = document.getElementById( 'showBottom' ),
		showLeftPush = document.getElementById( 'showLeftPush' ),
		showRightPush = document.getElementById( 'showRightPush' ),
		body = document.body;
		
		
showLeft.onclick = function() {
	classie.toggle( this, 'active' );
	classie.toggle( menuLeft, 'cbp-spmenu-open' );
};

showLeftPush.onclick = function() {
	classie.toggle( this, 'active' );
	classie.toggle( body, 'cbp-spmenu-push-toright' );
	classie.toggle( menuLeft, 'cbp-spmenu-open' );
};
