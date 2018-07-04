var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var DisplayProcessor = require('jasmine-spec-reporter').DisplayProcessor;
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [ 'specs/*-spec.js' ],
    onPrepare: function() {
        jasmine.getEnv().addReporter(
          new Jasmine2HtmlReporter({
            savePath: './reports/htmlReports',
            screenshotsFolder: 'screenshots',
            fileName: 'Dla-Test-Report',
            fileNameDateSuffix: true,
            fixedScreenshotName: true,
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: false
          })
        );

        jasmine.getEnv().addReporter(new SpecReporter({
                customProcessors: []
            })
        );
    },
    jasmineNodeOpts: {
        print: function() {}
    }
}