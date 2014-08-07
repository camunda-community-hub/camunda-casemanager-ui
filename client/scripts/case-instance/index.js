'use strict';


define([
  'angular',
  'camunda-casemanager-ui/api',
], function(
  angular,
  api
) {

  /**
   * @module cam.casemanager.case.instance
   */

  /**
   * @memberof cam.casemanager
   */

  var caseInstanceModul = angular.module('cam.casemanager.case.instance', [
    api.name,
    'ui.bootstrap'
  ]);


  caseInstanceModul.controller('caseInstanceCtrl', [
    '$scope',

  function (
    $scope
  ) {

    $scope.test = "Hello World";

  }]);

  return caseInstanceModul;
});
