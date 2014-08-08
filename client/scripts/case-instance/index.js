'use strict';


define([
  'angular',
  'camunda-casemanager-ui/api'
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
    'camAPI',

  function (
    $scope,
    camAPI
  ) {

    var caseExecutionResource = camAPI.resource('case-execution');

    $scope.itemsOpen = [];

    $scope.itemsActive = [];

    $scope.itemsCompleted = [];

    var executionsById = {};

    function reload() {
      $scope.itemsOpen = [];

      $scope.itemsActive = [];

      $scope.itemsCompleted = [];

      executionsById = {};

      caseExecutionResource.list({}, function(err, result) {
        angular.forEach(result, function(execution) {
          if(execution.id !== execution.caseInstanceId) {

            executionsById[execution.id] = execution;

            if(execution.enabled) {
              execution.state = "enabled";
              $scope.itemsOpen.push(execution);

            } else if(execution.disabled) {
              execution.state = "disabled";
              $scope.itemsOpen.push(execution);

            } else if(execution.active) {
              execution.state = "active";
              $scope.itemsActive.push(execution);

            }
          }
        });
      });
    }

    function planItemStateUpdate(event, ui) {
      var planItem;
      if (event.target.id !== 'active-plan-items' && ui.item.sortable.droptarget.attr('id') === 'active-plan-items') {
        planItem = ui.item.scope().item;
        if(CMMN_LIFE_CYCLE[planItem.state].indexOf("active") == -1) {
          ui.item.sortable.cancel();
        } else {
          caseExecutionResource.manualStart(planItem.id, {}, function(err, done) {
            if(err) {
              console.log(err);
            } else {
              planItem.state = "active";
              reload();
            }
          });

        }
      } else if (event.target.id !== 'completed-plan-items' && ui.item.sortable.droptarget.attr('id') === 'completed-plan-items') {
        planItem = ui.item.scope().item;
        if(CMMN_LIFE_CYCLE[planItem.state].indexOf("completed") == -1) {
          ui.item.sortable.cancel();
        } else {
          caseExecutionResource.complete(planItem.id, {}, function(err, done) {
            if(err) {
              var idx = $scope.itemsCompleted.indexOf(planItem);
              if(idx > -1) {
                $scope.itemsCompleted.splice(idx, 1);
                $scope.itemsActive.push(planItem);
              }
              console.log(err);
            } else {
              planItem.state = "completed";
              reload();
            }
          });
        }
      } else if (event.target.id !== 'open-plan-items' && ui.item.sortable.droptarget.attr('id') === 'open-plan-items') {
        ui.item.sortable.cancel();
      }
    }

    $scope.sortableOptions = {
      placeholder: "plan-item-placeholder",
      connectWith: ".plan-item-container",
      update: planItemStateUpdate,
      opacity: 0.8,
      sort: function(e, ui) {
        ui.item.sortable.cancel();
      }
    };

    $scope.toggleEnabled = function(item) {
      if(item.state === "enabled") {
        caseExecutionResource.disable(item.id, {}, function(err, done) {
          if(err) {
            console.log(err);
          } else {
            item.state = "disabled";
            reload();
          }
        });
      } else {
        caseExecutionResource.reenable(item.id, {}, function(err, done) {
          if(err) {
            console.log(err);
          } else {
            item.state = "enabled";
            reload();
          }
        });
      }
    };

    $scope.parentName = function(item) {
      var parent = executionsById[item.parentId];
      if(!!parent) {
        return parent.activityName;
      } else {
        return "none";
      }
    };

    $scope.hasParent = function(item) {
      return !!executionsById[item.parentId];
    };

    // initially, load list
    reload();

  }]);

  return caseInstanceModul;
});
