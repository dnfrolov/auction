'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        path: {
            app: 'public/assets/js/app.js',
            entry: 'public/app/index.js'
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
                    '<%= path.app %>': ['<%= path.entry %>']
                }
            },
            prod: {
                files: {
                    '<%= path.app %>': ['<%= path.entry %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};