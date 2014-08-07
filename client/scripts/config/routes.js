define([
  'text!camunda-casemanager-ui/index.html'
], function(
  casemanagerTemplate
) {
  'use strict';

  return [
    '$routeProvider',
  function(
    $routeProvider
  ) {

    $routeProvider
      .when('/', {
        template: casemanagerTemplate,
        authentication: 'required'
      })

      // // Would be great to be able to start processes with a URL
      // .when('/process/:processDefinitionId/start', {
      //   template: casemanagerTemplate,
      //   controller: 'processStartCtrl'
      // })
      // .when('/process/key/:processDefinitionKey/start', {
      //   template: casemanagerTemplate,
      //   controller: 'processStartCtrl'
      // })


      .when('/login', {
        template: casemanagerTemplate,
        controller: 'userLoginCtrl'
      })


      .when('/logout', {
        template: casemanagerTemplate,
        controller: 'userLogoutCtrl'
      })


      .otherwise({
        redirectTo: '/'
      })
    ;
  }];
});
