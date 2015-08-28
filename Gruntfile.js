'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        path: {
            ngBundle: 'public/assets/js/app.js',
            ngEntry: 'public/app/index.js',
            flEntry: 'public/flux/app/index.js',
            flBundle: 'public/flux/bundle.js'
        },

        browserify: {
            dev: {
                options: {
                    watch: true,
                    keepAlive: true,
                    browserifyOptions: {
                        debug: true
                    },
                    watchifyOptions: {
                        debug: true
                    }
                },
                files: {
                    '<%= path.ngBundle %>': ['<%= path.ngEntry %>'],
                    '<%= path.flBundle %>': ['<%= path.flEntry %>']
                }
            },
            prod: {
                files: {
                    '<%= path.ngBundle %>': ['<%= path.ngEntry %>'],
                    '<%= path.flBundle %>': ['<%= path.flEntry %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('dev', ['browserify:dev']);
};