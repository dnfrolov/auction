'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jade: {
            compile: {
                files: [
                    {
                        expand: true,
                        src: './public/**/*.jade',
                        dest: './',
                        ext: '.html'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
};