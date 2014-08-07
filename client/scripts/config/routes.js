define([
  'text!camunda-casemanager-ui/index.html',
  'text!camunda-casemanager-ui/case-instance/case-instance.html'
], function(
  casemanagerTemplate,
  caseInstanceTemplate
) {
  'use strict';

  return [
    '$routeProvider',
  function(
    $routeProvider
  ) {

    $routeProvider

      .when('/login', {
        template: casemanagerTemplate,
        controller: 'userLoginCtrl'
      })


      .when('/logout', {
        template: casemanagerTemplate,
        controller: 'userLogoutCtrl'
      })

      .when('/case-instance/:caseInstanceId', {
        template: caseInstanceTemplate,
        controller: 'caseInstanceCtrl',
        authentication: 'required'
      })

      .otherwise({
        redirectTo: '/'
      })
    ;
  }];
});
