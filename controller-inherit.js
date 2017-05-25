//angularjs 的controller间的继承（公用方法）
			(function () {
			    var app = angular.module('app', []);
			    app.controller('BaseController', ['$scope',
			        function ($scope) {
			            $scope.parentFunction = function () {
			                alert('case in parent function');
			            }
			
			            $scope.callFunction1 = function () {
			                alert('1. 调用方法-这是父类的方法');
			                $scope.$broadcast('Func1Emit');
			            }
						$scope.callFunction1();
			            $scope.callFunction2 = function () {
			                var data = {
			                    success: true
			                };
			                $scope.$broadcast('BeforeCallFunc2', data);
			                if (data.success === false) {
			                    return false;
			                }
			                alert('2. 调用方法-这是父类的方法');
			            }
			            $scope.callFunction2();
			        }
			    ])
			
			    app.controller('FormController', ['$scope', '$controller',
			        function ($scope, $controller) {
			            $scope.callSelfFunction = function () {
			                alert('case in self function ');
			            }
			            $scope.$on('Func1Emit', function () {
			                alert('2. 子类进行扩展');
			            });
			            $scope.$on('BeforeCallFunc2', function (event, checkdata) {
			                checkdata.success = false;
			                alert('2. 覆盖父类方法！！');
			            });
						var vm = this;
						
			            $controller('BaseController', {$scope, $scope,"isinherit":true});
//			            angular.extend(vm, parentCtrl);
//			            parentCtrl.parentFunction();
			        }
			    ])
			})();
