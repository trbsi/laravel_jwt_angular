(function () {
    'use strict';
 
    angular
        .module('myApp', ['ui.router', 'ngMessages', 'ngStorage'])
        .config(config)
        .run(run);
 
    function config($stateProvider, $urlRouterProvider) {

        // default route
        $urlRouterProvider.otherwise("/");
 
        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/index.view.html',
                //controller: 'Home.IndexController',
                //controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.view.html',
                controller: 'mainController',
                controllerAs: 'vm'
            });

    }
 
    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        $rootScope.email = '?';
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            $rootScope.email = $localStorage.currentUser.email;
        }


 
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {

        	
            var publicPages = ['/login'];

            if(publicPages.indexOf($location.path()) != -1 && $localStorage.currentUser)
            {
            	$location.path('/');
            }

            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();