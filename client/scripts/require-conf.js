'use strict';
/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
/* jshint ignore:end */

define(function() {
  var config = {
    baseUrl: './',

    paths: {
      'text':                       'bower_components/requirejs-text/text',
      'json':                       'bower_components/requirejs-json/json',

      'angular':                    'bower_components/angular/angular',
      'angular-route':              'bower_components/angular-route/angular-route',
      'angular-messages':           'bower_components/angular-messages/angular-messages',
      'angular-sanitize':           'bower_components/angular-sanitize/angular-sanitize',
      'angular-animate':            'bower_components/angular-animate/angular-animate',

      'moment':                     'bower_components/moment/moment',
      'jquery':                     'bower_components/jquery/dist/jquery',
      'jquery-ui':                  'bower_components/jquery-ui',

      'bootstrap':                  'bower_components/bootstrap/js',
      'angular-bootstrap':          'bower_components/angular-bootstrap/ui-bootstrap-tpls',
      'angular-moment':             'bower_components/angular-moment/angular-moment',
      'angular-translate':          'bower_components/angular-translate/angular-translate',
      'angular-ui-sortable':        'bower_components/angular-ui-sortable/sortable',

      'camunda-casemanager-ui':     'scripts',


      'camunda-commons-ui':         'vendor/camunda-commons-ui/lib',


      'camunda-bpm-sdk':            'bower_components/camunda-bpm-sdk-js/camunda-bpm-sdk-angular',

    },

    shim: {
      'bootstrap':                  ['jquery'],


      'angular':                    {
                                      exports: 'angular',
                                      deps: ['jquery', 'jquery-ui/ui/sortable']
                                    },

      'camunda-bpm-sdk':            ['angular'],

      'angular-route':              ['angular'],
      'angular-animate':            ['angular'],

      'angular-bootstrap':          ['angular'],
      'angular-moment':             ['angular', 'moment'],

      'jquery-ui/ui/widget':        ['jquery-ui/ui/core'],
      'jquery-ui/ui/mouse':         ['jquery-ui/ui/widget'],
      'jquery-ui/ui/sortable':      ['jquery-ui/ui/core', 'jquery-ui/ui/widget', 'jquery-ui/ui/mouse'],

      'angular-ui-sortable':        ['angular'],


      'camunda-casemanager-ui':        [
                                      'angular-route',
                                      'angular-animate',

                                      'angular-ui-sortable',

                                      'angular-translate',

                                      'camunda-commons-ui/auth',
                                      'camunda-commons-ui/util/notifications',

                                      'camunda-casemanager-ui/config/routes',
                                      'camunda-casemanager-ui/config/translations',
                                      'camunda-casemanager-ui/config/uris',

                                      'camunda-casemanager-ui/api',
                                      'camunda-casemanager-ui/overview',
                                      'camunda-casemanager-ui/case-instance',
                                      'camunda-casemanager-ui/user',

                                      'bootstrap/collapse',
                                      'camunda-casemanager-ui/navigation/index',

                                      'camunda-commons-ui/directives/notificationsPanel',

                                      'text!camunda-casemanager-ui/index.html',
                                      'json!locales/en.json',
                                      'json!locales/de.json',
                                      'json!locales/fr.json'
                                    ]
    },

    packages: [
      {
        name: 'camunda-commons-ui',
        main: 'index'
      },
      {
        name: 'camunda-commons-ui/auth',
        main: 'index'
      },
      {
        name: 'camunda-casemanager-ui',
        main: 'index'
      },
      {
        name: 'camunda-casemanager-ui/api',
        main: 'index'
      },
      {
        name: 'camunda-casemanager-ui/overview',
        main: 'index'
      },
      {
        name: 'camunda-casemanager-ui/case-instance',
        main: 'index'
      },
      {
        name: 'camunda-casemanager-ui/user',
        main: 'index'
      }
    ]
  };

  return config;
});
