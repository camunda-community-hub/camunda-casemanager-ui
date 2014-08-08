'use strict';


define([
  'angular',
  'camunda-casemanager-ui/api'
], function(
  angular,
  api
) {

  var ngModule = angular.module('cam.casemanager.overview', [
    api.name,
    'ui.bootstrap'
  ]);


  ngModule.controller('overviewCtrl', [
    '$scope',
    '$timeout',
    'camAPI',

  function (
    $scope,
    $timeout,
    camAPI
  ) {

    var caseDefinitionResource = camAPI.resource('case-definition');
    var caseInstanceResource = camAPI.resource('case-instance');

    $scope.caseDefinitions = [];

    $scope.caseInstances = [];

    var definitions = {};

    function loadCaseDefinitions() {
      definitions = {};
      caseDefinitionResource.list({}, function(err, result) {
        $scope.caseDefinitions = result;
        angular.forEach(result, function(def) {
          definitions[def.id] = def.name;
        });
      });
    }

    function loadCaseInstances() {
      caseInstanceResource.list({}, function(err, result) {
        $scope.caseInstances = result;
      });
    }

    $scope.createCaseInstance = function(definition) {
      caseDefinitionResource.create(definition.id, {}, function(err, result) {
        loadCaseInstances();
      });
    };

    $scope.definitionName = function(id) {
      return definitions[id];
    };

    $scope.closeCaseInstance = function(inst) {
      caseInstanceResource.close(inst.id, {}, function(err, result) {
        loadCaseInstances();
      });
    };

    // init
    loadCaseInstances();
    loadCaseDefinitions();
  }]);


  return ngModule;
});
