module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            options: {
                port: 8080,
                hostname: 'localhost'
            },
            testserver: {
                options: {
                    base: ['./']
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'routes/*.js',
                'app.js',
                'specs/*.js'
            ],
            options: {
                globals: {
                    jQuery: true
                },
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            }
        },
        protractor_webdriver: {
            options: {}
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            continuous: {
                configFile: 'karma.conf.js'
            }
        },
        nightwatch: {
            options: {
                standalone: true,
                jar_path: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.8.1.jar',
                src_folders: [ "tests/e2e" ],
                output_folder: './reports/',
                globals_path: "./nightwatch-globals.js", 
                selenium: {
                    "start_process": true,
                    "server_path": "./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.8.1.jar",
                    "log_path": "reports/",
                    "host": "127.0.0.1",
                    "port": 4444,
                    "cli_args": {
                        "webdriver.chrome.driver": "./node_modules/chromedriver/lib/chromedriver/chromedriver",
                        "webdriver.ie.driver": ""
                    }
                },
                "test_settings" : {
                    "default" : {
                      "launch_url" : "http://localhost:8080",
                      "selenium_port"  : 4444,
                      "selenium_host"  : "localhost",
                      "desiredCapabilities": {
                        "browserName": "chrome",
                        "javascriptEnabled": true,
                        "acceptSslCerts": true,
                        "chromeOptions": {
                            "args": [ "start-fullscreen" ]
                        }
                      }
                    }
                } 
            }
        },
        nightwatch_report: {
            files: [ './reports/**/*.xml'],
            options: {
              outputDir: './reports/summary/'
            }
        },
        protractor: {
            options: {
                configFile: 'conf.js',
                noColor: false,
                debug: false,
                webdriverManagerUpdate: true
            },
            system: {
                options: {
                    keepAlive: false
                }
            },
            continuous: {
                options: {
                    keepAlive: true
                }
            }
        },
        watch: {
            options: {},
            express: {
                files: [ '**/*.js' ],
                tasks: [ 'express:dev' ],
                options: {
                    spawn: false
                }
            },
            public: {
                files: [ 'public/**/*.css', 'public/**/*.js' ],
                tasks: ['jshint']
            }
        },
        clean: [ 'reports/summary', 'reports/*.xml', 'reports/*.log' ],
        pkg: grunt.file.readJSON('package.json'),
        express: {
            options: {
                debug: false
            },
            dev: {
                options: {
                    script: 'app.js',
                    node_env: 'development'
                }
            },
            prod: {
                options: {
                    script: 'app.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    port: 9000,
                    script: 'app.js',
                    node_env: 'test'
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        },
        server: {
            options: {
                livereload: true,
                background: true
            }
        },
        testserver: {
            options: {
                port: 9999,
                livereload: false,
                background: true
            }
        }
    });

    // Load the plugin that provides the 'uglify' task:
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-nightwatch');
    grunt.loadNpmTasks('grunt-nightwatch-report');

    grunt.registerTask('banner', 'Generate Banner', function(){
        grunt.log.ok(
            '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n                    $$$$$$$\\  $$\\      $$\\ $$$$$$$\\\n                    $$  __$$\\ $$ | $\\  $$ |$$  __$$\\\n                    $$ |  $$ |$$ |$$$\\ $$ |$$ |  $$ |\n                    $$ |  $$ |$$ $$ $$\\$$ |$$$$$$$  |\n                    $$ |  $$ |$$$$  _$$$$ |$$  ____/\n                    $$ |  $$ |$$$  / \\$$$ |$$ |\n                    $$$$$$$  |$$  /   \\$$ |$$ |\n                    \\_______/ \\__/     \\__|\\__|\n\n      --- DEVELOPMENT ---\n      grunt dev (default):  builds and renders server (on port 8080) (use CTRL+C to exit)\n\n\n      --- TESTING ---\n      grunt test:  builds and runs the e2e tests\n\n\nnb: grunt dev listens on http://localhost:8080/\n\nnb: Selenium listens on http://localhost:4444/\n\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
        );
    });

    grunt.registerTask('clear', 'Clear Console', function () {
        process.stdout.write('\033');
        process.stdout.write('\033[2J');
        process.stdout.write('\u001b[2J\u001b[0;0H');
    });    

    // Default:
    //grunt.registerTask('test', [ 'jshint', 'express:test', 'protractor_webdriver', 'protractor:system' ]);
    //grunt.registerTask('test', [ 'clean', 'banner', 'jshint', 'express:test', 'protractor_webdriver', 'protractor:system' ])
    grunt.registerTask('dev', ['clean', 'banner', 'jshint', 'concurrent']);
    grunt.registerTask('default', ['dev']);
    grunt.registerTask('test', ['clean', 'banner', 'jshint', 'express:test', 'nightwatch', 'nightwatch_report']);
};