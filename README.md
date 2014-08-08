camunda-casemanager-ui
======================

UI for playing around with CMMN


```bash
git clone git@github.com:camunda/camunda-casemanager-ui.git
git clone git@github.com:camunda/camunda-bpm-sdk-js.git
git clone git@github.com:camunda/camunda-bpm-webapp.git

cd camunda-bpm-sdk-js
npm install
npm link
grunt build

cd ../camunda-bpm-sdk-js
npm install
bower install
npm link camunda-bpm-sdk-js
grund auto-build

# in a different terminal
cd ../camunda-bpm-webapp
git checkout casemanager
mvn clean jetty:run -Pdevelop-casemanager
```

