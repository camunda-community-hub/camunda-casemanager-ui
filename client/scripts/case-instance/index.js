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
    'ui.bootstrap',
    'ui.sortable'
  ]);


  caseInstanceModul.controller('caseInstanceCtrl', [
    '$scope',

  function (
    $scope
  ) {

    $scope.itemsOpen = [
      {id: '1', name: "A"},
      {id: '2', name: "B"},
      {id: '3', name: "C"},
      {id: '4', name: "D"}
    ];

    $scope.itemsActive = [
      {id: '5', name: "E"}
    ];

    $scope.itemsCompleted = [
      {id: '6', name: "F"}
    ];

  }]);

  return caseInstanceModul;
});
