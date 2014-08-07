'use strict';

define([
  'angular',
  './directives/cam-casemanager-navigation',
  'camunda-casemanager-ui/utils',
  'camunda-commons-ui/util/index',
], function(
  angular,
  camCasemanagerNavigation,
  camSortingChoices
) {
  var navigationModule = angular.module('cam.casemanager.navigation', [
    require('camunda-casemanager-ui/utils').name,
    require('camunda-commons-ui/util/index').name,
    'ui.bootstrap',
    'cam.casemanager.user'
  ]);

  navigationModule.directive('camCasemanagerNavigation', camCasemanagerNavigation);

  return navigationModule;
});
