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
						$scope.backandSignup=function(){
							Backand.signup(FirstName,LastName,UserName,Password,ConfirmPassword, extraObj).then(function(response) {
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
						$scope.loginWithFb = function() {
							var FBSuccess = false;
							FB
									.getLoginStatus(function(Bigresponse) {
										if (Bigresponse.status == "connected") {
											alert(JSON.stringify(Bigresponse));
											if (Bigresponse.authResponse) {
												console.log('Welcome!  Fetching your information.... ');
												$scope.getUserInfo();
											} else {
												console.log('User cancelled login or did not fully authorize.');
											}

										} else if (Bigresponse.status == "not_authorized"
												|| Bigresponse.status == "unknown") {
											FB
													.login(function(response) {
														if (response.authResponse) {
															console.log('Welcome!  Fetching your information.... ');
															$scope.getUserInfo();
														} else {
															console.log('User cancelled login or did not fully authorize.');
														}
													});
										}
									});
						}
						$scope.getUserInfo = function() {
							FB
									.api(
											'/me'
													+ '?fields=first_name,last_name,gender,birthday,email,verified,hometown,location',
											function(response) {
												if (response && !response.error) {
													console
															.log('Good to see you, '
																	+ response.name
																	+ '.');
													//$scope.backandSignup
												}
											});
						}
						$scope.logout = function() {
							console.log(Backand);
							$scope.responseSO = Backand.signout();
							console.log($scope.responseSO);

						}
					});

				});