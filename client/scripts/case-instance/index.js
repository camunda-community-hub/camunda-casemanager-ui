'use strict';


define([
  'angular',
  'camunda-casemanager-ui/api',
], function(
  angular,
  api
) {


  var CMMN_LIFE_CYCLE = {
    "enabled" : ["disabled", "active"],
    "disabled" : ["enabled"],
    "active" : ["completed"],
    "completed": []
  };

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
      {id: '1', name: "Schufa Prüfung", state: "enabled"},
      {id: '2', name: "B", state: "disabled"},
      {id: '3', name: "C", state: "enabled"},
      {id: '4', name: "D", state: "enabled"}
    ];

    $scope.itemsActive = [
      {id: '5', name: "E", state: "active"}
    ];

    $scope.itemsCompleted = [
      {id: '6', name: "F", state: "completed"}
    ];

    function planItemStateUpdate(event, ui) {
      var planItem;
      if (event.target.id !== 'active-plan-items' && ui.item.sortable.droptarget.attr('id') === 'active-plan-items') {
        planItem = ui.item.scope().item;
        if(CMMN_LIFE_CYCLE[planItem.state].indexOf("active") == -1) {
          ui.item.sortable.cancel();
        } else {
          planItem.state = "active";
        }
      } else if (event.target.id !== 'completed-plan-items' && ui.item.sortable.droptarget.attr('id') === 'completed-plan-items') {
        planItem = ui.item.scope().item;
        if(CMMN_LIFE_CYCLE[planItem.state].indexOf("completed") == -1) {
          ui.item.sortable.cancel();
        } else {
          planItem.state = "completed";
        }
      } else if (event.target.id !== 'open-plan-items' && ui.item.sortable.droptarget.attr('id') === 'open-plan-items') {
        ui.item.sortable.cancel();
      }
    }

    $scope.sortableOptions = {
      placeholder: "plan-item-placeholder",
      connectWith: ".plan-item-container",
      update: planItemStateUpdate,
    };

  }]);

  return caseInstanceModul;
});
