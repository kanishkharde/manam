var loginApp = angular.module("loginApp", [ 'backand', 'ngRoute' ]);
loginApp.config(function(BackandProvider, $routeProvider) {
	BackandProvider.setAppName('firstwebapp');
	BackandProvider.setSignUpToken('f80af7c5-783c-4589-ac54-91327befdd01');
	BackandProvider.setAnonymousToken('022db3d5-75b9-4cd0-866d-f74db15c6f39');
});
loginApp
		.controller(
				'RegistrationController',
				function($scope, $rootScope, $http, $location, $timeout,
						Backand) {
					$(function() {

						$('#login-form-link').click(function(e) {
							$("#login-form").delay(100).fadeIn(100);
							$("#register-form").fadeOut(100);
							$('#register-form-link').removeClass('active');
							$(this).addClass('active');
							e.preventDefault();
						});
						$('#register-form-link').click(function(e) {
							$("#register-form").delay(100).fadeIn(100);
							$("#login-form").fadeOut(100);
							$('#login-form-link').removeClass('active');
							$(this).addClass('active');
							e.preventDefault();
						});
						$('#dob').datepicker({
							language : 'en',
							minDate : new Date()
						// Now can select only dates, which goes after today
						});
						$('#dob').data('datepicker');

						console.log("Registration Controller");
						$scope.userInput = {};
						$scope.register = function() {
							$scope.userInput.dob = new Date(
									$scope.userInput.dob);
							alert($scope.userInput.dob);
							alert(JSON.stringify($scope.userInput.dob));
							console.log("---Register() Called--");
							console.log($scope.userInput);
							$scope.backandSignup($scope.userInput.FirstName,
									$scope.userInput.LastName,
									$scope.userInput.UserName,
									$scope.userInput.Password,
									$scope.userInput.ConfirmPassword, {
										dob : $scope.userInput.dob
									});
						}
						$scope.getUserDetails = function() {
						    var user = Backand.user.getUserDetails().then(function(user){
						    	console.log(user);
						      $scope.currentUser = user.data.username;
						    }, function(error){
						      $scope.currentUser = null;
						      //$scope.errorMsg = error;
						    })
						  }
						  
						$scope.socialSignin = function () {
							provider="facebook"
					    return Backand.socialSignin(provider)
					      .then(function (response) {
					    	  console.log(response);
					    	  console.log(Backand);
					        $scope.getUserDetails();
					        return response;
					    }, errorHandler);
					  };
					  var errorHandler=function(error){
						  console.log(error);
					  }
						$scope.backandSignup = function(FirstName, LastName, UserName,
								Password, ConfirmPassword, extraObj) {
							Backand.signup(FirstName, LastName, UserName,
									Password, ConfirmPassword, extraObj).then(
									function(response) {
										console.log(response);
									}, function(errResponse) {
										console.log(errResponse);
									});
						}
						$scope.login = function() {
							Backand.signin($scope.username, $scope.password)
									.then(function(response) {
										console.log(response);
										bootbox.alert("Logged In");
										window.location = "app.html";
									}, function(errResponse) {
										console.log("Cant Login");
										console.log(errResponse);
									});
						}
						$scope.socialProviders = {
								  facebook: { name: 'facebook', btn: 'facebook', label: 'Facebook', url: 'www.facebook.com', css: { backgroundColor: '#3b5998' }, id: 3 },
								};
						$scope.logout = function() {
							console.log(Backand);
							$scope.responseSO = Backand.signout();
							console.log($scope.responseSO);

						}
					});

				});