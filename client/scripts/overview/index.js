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
    'Notifications',
    'Uri',
    'camAPI',

  function (
    $scope,
    Notifications,
    Uri,
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


    function uploadProgress(evt) {
      $scope.$apply(function(){
        if (evt.lengthComputable) {
          $scope.progress = Math.round(evt.loaded * 100 / evt.total);
        }
      });
    }

    function uploadComplete() {
      $scope.$apply(function(){
        Notifications.addMessage({'status': 'Success', 'message': 'File upload successfull.'});
        loadCaseDefinitions();
      });
    }

    function uploadFailed() {
      $scope.$apply(function(){
        Notifications.addError({'status': 'Failed', 'message': 'File upload failed.', 'exclusive': ['type']});
      });
    }

    $scope.setFile = function(element) {
      $scope.file = element.files[0];

      // perform HTML 5 file opload (not supported by IE 9)
      var fd = new FormData();
      fd.append('data', $scope.file);
      fd.append('deployment-name', "ui-deployment");
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', uploadProgress, false);
      xhr.addEventListener('load', uploadComplete, false);
      xhr.addEventListener('error', uploadFailed, false);
      xhr.addEventListener('abort', uploadFailed, false);
      xhr.open('POST', Uri.appUri('engine://engine/:engine/deployment/create'));
      xhr.send(fd);

    };

    // init
    loadCaseInstances();
    loadCaseDefinitions();
  }]);


  return ngModule;
});
