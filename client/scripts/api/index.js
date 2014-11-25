'use strict';

define([
  'angular',
  'camunda-bpm-sdk'],
function(
  angular,
  CamSDK
) {
  var apiModule = angular.module('cam.casemanager.client', []);

  apiModule.value('HttpClient', CamSDK.Client);

  apiModule.value('CamForm', CamSDK.Form);


  apiModule.factory('camAPIHttpClient', [
           '$rootScope',
  function($rootScope) {

    function AngularClient(config) {
      this._wrapped = new CamSDK.Client.HttpClient(config);
    }

    angular.forEach(['post', 'get', 'load', 'put', 'del'], function(name) {
      AngularClient.prototype[name] = function(path, options) {
        if (!options.done) {
          return;
        }

        var original = options.done;

        options.done = function(err, result) {
          $rootScope.$apply(function() {
            original(err, result);
          });
        };

        this._wrapped[name](path, options);
      };
    });

    angular.forEach(['on', 'once', 'off', 'trigger'], function(name) {
      AngularClient.prototype[name] = function() {
        this._wrapped[name].apply(this, arguments);
      };
    });

    return AngularClient;
  }]);


  apiModule.factory('camAPI', [
          'camAPIHttpClient',
  function(camAPIHttpClient) {
    var conf = {
      apiUri:     'engine-rest/engine',
      HttpClient: camAPIHttpClient
    };

    if (window.casemanagerConf) {
      for (var c in window.casemanagerConf) {
        conf[c] = window.casemanagerConf[c];
      }
    }

    return new CamSDK.Client(conf);
  }]);

  return apiModule;
});
