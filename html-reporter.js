const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: __dirname + '/reports',
    reportFilename: 'TestReport.html'
});

module.exports = {
  write: (results, options, done) => {
    reporter.fn(results, done);
  }
};