define([
  'text!camunda-casemanager-ui/index.html',
  'text!camunda-casemanager-ui/overview/overview.html',
  'text!camunda-casemanager-ui/case-instance/case-instance.html'
], function(
  casemanagerTemplate,
  overviewTemplate,
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

      .when('/overview', {
        template: overviewTemplate,
        controller: 'overviewCtrl',
        authentication: 'required'
      })

      .when('/case-instance/:caseInstanceId', {
        template: caseInstanceTemplate,
        controller: 'caseInstanceCtrl',
        authentication: 'required'
      })

      .otherwise({
        redirectTo: '/overview'
      })
    ;
  }];
});
