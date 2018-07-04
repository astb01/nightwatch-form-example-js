let gulp = require('gulp');
let gutil = require('gulp-util');
let gls = require('gulp-live-server');
let gclean = require('gulp-clean');
let nightwatch = require('gulp-nightwatch');
let clearScreen = require('clear-screen');
let open = require('gulp-open');
let exit = require('gulp-exit');

let testServer = gls('./app.js', { 
  env: { 
    NODE_ENV: 'development', 
    PORT: 8080 
  }
});

let devServer = gls('./app.js', { 
  env: { 
    NODE_ENV: 'development', 
    PORT: 8080 
  }
});

gulp.task('clearScreen', () => {
  return clearScreen();
})

gulp.task('express', () => {
  let server = gls.new('./app.js');

  return server.start();
});

gulp.task('express:dev', () => {
  gulp.watch([ 'public/**/*.css', 'public/**/*.js', 'public/images/*' ], (file) => {
    devServer.notify.apply(devServer, [file]);
  });

  return devServer.start();
});

gulp.task('express:test', () => {
  return testServer.start();
});

gulp.task('stopServer', () => {
  return testServer.stop();
});

gulp.task('cleanSummary', () => {
  return gulp.src('reports/summary', {read: false})
    .pipe(gclean());
});

gulp.task('cleanXML', () => {
  return gulp.src('reports/*.xml', {read: false})
    .pipe(gclean());
});

gulp.task('cleanLogs', () => {
  return gulp.src('reports/*.log', {read: false})
    .pipe(gclean());
});

gulp.task('cleanScreenshots', () => {
  return gulp.src('tests/e2e/screenshots/*.png', {read: false})
    .pipe(gclean());
});

gulp.task('banner', () => {
  return gutil.log(
    '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n                    $$$$$$$\\  $$\\      $$\\ $$$$$$$\\\n                    $$  __$$\\ $$ | $\\  $$ |$$  __$$\\\n                    $$ |  $$ |$$ |$$$\\ $$ |$$ |  $$ |\n                    $$ |  $$ |$$ $$ $$\\$$ |$$$$$$$  |\n                    $$ |  $$ |$$$$  _$$$$ |$$  ____/\n                    $$ |  $$ |$$$  / \\$$$ |$$ |\n                    $$$$$$$  |$$  /   \\$$ |$$ |\n                    \\_______/ \\__/     \\__|\\__|\n\n      --- DEVELOPMENT ---\n      gulp (default):  builds and renders server (on port 8080) (use CTRL+C to exit)\n\n\n      --- TESTING ---\n      gulp test:  builds and runs the e2e tests\n\n\nnb: gulp test listens on http://localhost:8080/\n\nnb: Selenium listens on http://localhost:4444/\n\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
  );
});

gulp.task('nightwatch:chrome', () => {
  // example config: // https://github.com/tatsuyafw/gulp-nightwatch/issues/43

   gulp.src('gulpfile.js')
    .pipe(nightwatch({
      configFile: './nightwatch.json',
      cliArgs: [ '--env default', '--reporter ./html-reporter.js' ]
    }))
    .pipe(exit());
});

gulp.task('openBrowser', () => {
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8080'}));
});

gulp.task('cleanAll', [ 'cleanSummary', 'cleanXML', 'cleanLogs', 'cleanScreenshots' ]);

gulp.task('default', [ 'clearScreen', 'banner', 'express:dev' ]);

gulp.task('test', [ 'clearScreen', 'cleanAll', 'banner', 'express:test', 'nightwatch:chrome' ]);