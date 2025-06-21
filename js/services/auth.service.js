
(function () {
  'use strict';

  angular
    .module('app')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$q', '$window'];
  function AuthService($q, $window) {
    var users   = JSON.parse($window.localStorage.getItem('users')      || '[]');
    var current = JSON.parse($window.sessionStorage.getItem('currentUser') || 'null');
    function saveUsers() {
      $window.localStorage.setItem('users', JSON.stringify(users));
    }
    function saveCurrent(user) {
      $window.sessionStorage.setItem('currentUser', JSON.stringify(user));
      current = angular.copy(user);
    }

    return {
      register: function(user) {
        var deferred = $q.defer();
        if (users.find(u => u.email === user.email)) {
          deferred.reject('Email already registered');
        } else {
          user.id        = Date.now();
          user.favorites = [];
          user.reviews   = [];
          users.push(angular.copy(user));
          saveUsers();
          deferred.resolve(user);
        }
        return deferred.promise;
      },

      login: function(email, password) {
        var deferred = $q.defer();
        var user = users.find(u => u.email === email && u.password === password);
        if (user) {
          saveCurrent(user);
          deferred.resolve(current);
        } else {
          deferred.reject('Invalid email or password');
        }
        return deferred.promise;
      },

      logout: function() {
        current = null;
        $window.sessionStorage.removeItem('currentUser');
      },

      isLoggedIn: function() {
        return !!current;
      },

      getCurrent: function() {
        return current;
      },

      updateProfile: function(data) {
        var idx = users.findIndex(u => u.id === current.id);
        if (idx >= 0) {
          users[idx] = angular.extend(users[idx], data);
          saveUsers();
          saveCurrent(users[idx]);
        }
      },

      leaveReview: function(productId, text) {
        var review = { userId: current.id, text: text, date: new Date() };
        current.reviews = current.reviews || [];
        current.reviews.push(review);
        saveCurrent(current);
        return review;
      },

      toggleFavorite: function(productId) {
        if (!current) return;
        current.favorites = current.favorites || [];
        var idx = current.favorites.indexOf(productId);
        if (idx === -1) current.favorites.push(productId);
        else current.favorites.splice(idx, 1);
        saveCurrent(current);
        saveUsers();
      }
    };
  }
})();
