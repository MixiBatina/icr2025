
(function () {
  'use strict';

  angular
    .module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngMessages'])
    .config(configureStates)
    .run(authGuard);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configureStates($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>Welcome!</h1><p>Select a view above.</p>'
      })
      .state('list', {
        url: '/list',
        templateUrl: '/templates/list.html',
        controller: 'ListController',
        controllerAs: 'vm'
      })
      .state('detail', {
        url: '/detail/:id',
        templateUrl: '/templates/detail.html',
        controller: 'DetailController',
        controllerAs: 'vm'
      })
      .state('form', {
        url: '/form',
        templateUrl: '/templates/form.html',
        controller: 'FormController',
        controllerAs: 'vm'
      })
      .state('products', {
        url: '/products',
        templateUrl: '/templates/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'vm'
      })
      .state('product', {
        url: '/product/:id',
        templateUrl: '/templates/product-detail.html',
        controller: 'ProductCtrl',
        controllerAs: 'vm'
      })
      .state('cart', {
        url: '/cart',
        templateUrl: '/templates/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'vm',
        data: { requiresAuth: true }
      })
      .state('checkout', {
        url: '/checkout',
        templateUrl: '/templates/checkout.html',
        controller: 'CheckoutCtrl',
        controllerAs: 'vm',
        data: { requiresAuth: true }
      })
      .state('login', {
        url: '/login',
        templateUrl: '/templates/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('register', {
        url: '/register',
        templateUrl: '/templates/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '/templates/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'vm',
        data: { requiresAuth: true }
      });
  }

  authGuard.$inject = ['$transitions', 'AuthService', '$state'];
  function authGuard($transitions, AuthService, $state) {
    $transitions.onStart({}, function (transition) {
      var toState = transition.to();
      if (toState.data && toState.data.requiresAuth && !AuthService.isLoggedIn()) {
        return $state.target('login');
      }
    });
  }
})();
