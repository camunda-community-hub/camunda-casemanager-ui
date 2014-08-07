'use strict';


define('camunda-casemanager-ui', [
  'camunda-casemanager-ui/require-conf',
  'camunda-casemanager-ui/utils',
], function(
  rjsConf
) {
  /**
   * @namespace cam
   */

  /**
   * @module cam.casemanager
   */

  var casemanagerApp;


  var appModules = rjsConf.shim['camunda-casemanager-ui'];


  var deps = [
    'angular',
    'text!camunda-casemanager-ui/index.html'
  ].concat(appModules);



  // converts AMD paths to angular module names
  // "camunda-casemanager-ui/pile" will be "cam.casemanager.pile"
  function rj2ngNames(names) {
    var name, translated = [];
    for (var n = 0; n < names.length; n++) {
      name = (require(names[n]) || {}).name;
      if (name) translated.push(name);
    }
    return translated;
  }



  function loaded() {
    var angular = require('angular');
    var $ = angular.element;

    var ngDeps = rj2ngNames(appModules).concat([
      'pascalprecht.translate',
      'ngRoute'
    ]);

    casemanagerApp = angular.module('cam.casemanager', ngDeps);

    casemanagerApp.config([
      'UriProvider',
    function(
      UriProvider
    ) {
      var $baseTag = $('base');

      function getUri(name) {
        var uri = $baseTag.attr(name);
        if (!name) {
          throw new Error('Uri base for ' + name + ' could not be resolved');
        }

        return uri;
      }

      UriProvider.replace(':appName', 'casemanager');
      UriProvider.replace('app://', getUri('href'));
      UriProvider.replace('adminbase://', getUri('app-root') + '/app/admin/');
      UriProvider.replace('tasklistbase://', getUri('app-root') + '/app/tasklist/');
      UriProvider.replace('cockpitbase://', getUri('app-root') + '/app/cockpit/');
      UriProvider.replace('casemanagerbase://', getUri('app-root') + '/app/casemanager/');
      UriProvider.replace('admin://', getUri('admin-api'));
      UriProvider.replace('plugin://', getUri('admin-api') + 'plugin/');
      UriProvider.replace('engine://', getUri('engine-api'));

      // for forms
      UriProvider.replace('app:', 'casemanager');
      UriProvider.replace('embedded:', getUri('app-root'));

      UriProvider.replace(':engine', [ '$window', function($window) {
        var uri = $window.location.href;

        var match = uri.match(/\/app\/casemanager\/(\w+)(|\/)/);
        if (match) {
          return match[1];
        } else {
          throw new Error('no process engine selected');
        }
      }]);
    }]);

    casemanagerApp.config([
      '$routeProvider',
      '$locationProvider',
      '$translateProvider',
    function(
      $routeProvider,
      $locationProvider,
      $translateProvider
    ) {

      // Simply register translation table as object hash
      $translateProvider
        .translations('en', require('json!locales/en.json'))
        .translations('de', require('json!locales/de.json'))
        .translations('fr', require('json!locales/fr.json'))

        // using the determinePreferredLanguage()
        // would lead to use something like "en_US"
        .determinePreferredLanguage()
        .fallbackLanguage('en');

    }]);

    var notificationsPanel = require('camunda-commons-ui/directives/notificationsPanel');
    casemanagerApp.directive('notificationsPanel', notificationsPanel);

    casemanagerApp.config(require('camunda-casemanager-ui/config/uris'));
    casemanagerApp.config(require('camunda-casemanager-ui/config/translations'));
    casemanagerApp.config(require('camunda-casemanager-ui/config/routes'));

    $(document).ready(function() {
      angular.bootstrap(document, ['cam.casemanager', 'cam.embedded.forms']);
    });
  }


  // configure require.js
  require.config(rjsConf);

  // and load the dependencies
  require(deps, loaded);
});
