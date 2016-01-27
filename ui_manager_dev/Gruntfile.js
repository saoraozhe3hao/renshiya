/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var fs = require('fs');
    var path = require('path');

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        clean: {
            dist: '../ui'
        },

        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: './css/bootstrap.css.map'
                },
                src: 'less/bootstrap.less',
                dest: './css/bootstrap.css'
            },
            compileRenshiya: {
                options: {
                    //非严格计算，使得px能计算
                    strictMath: false,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: './css/<%= pkg.name %>.css.map'
                },
                src: 'less/<%= pkg.name %>/renshiya.less',
                dest: './css/<%= pkg.name %>.css'
            }
        },


        copy: {
            dist: {
                files: [
                    //expand 为true，src匹配所有；否则只匹配一个。
                    {expand: true, src: 'fonts/*', dest: '../ui_manager/'},
                    {src: ['*.php'], dest: '../ui_manager/'},
                    {expand: true, src: 'js/*', dest: '../ui_manager/'},
                    {expand: true, src: 'views/**', dest: '../ui_manager/'},
                    {expand: true, src: 'css/*', dest: '../ui_manager/'},
                    {expand: true, src: 'img/*', dest: '../ui_manager/'}
                ]
            },
            ready: {
                files: [
                    //dest指定为文件夹时，会把src里包含的目录层次一并拷贝；为避免拷贝整个目录，dest指定成文件
                    {src: ['bower_components/angular/angular.min.js'], dest: 'js/angular.min.js'},
                    {src: ['bower_components/angular/angular.min.js.map'], dest: 'js/angular.min.js.map'},
                    {src: ['bower_components/angular-route/angular-route.min.js'], dest: 'js/angular-route.min.js'},
                    {src: ['bower_components/angular-route/angular-route.min.js.map'], dest: 'js/angular-route.min.js.map'}
                ]
            }
        },

        watch: {
            less: {
                //监控对象，匹配less下的所有文件
                files: ['less/**/*.less'],
                //监控对象发生变化，出发的任务
                tasks: ['less:compileRenshiya']
            }
        }
    });


    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    grunt.registerTask('css-ready', ['less:compileCore', 'less:compileRenshiya']);

    grunt.registerTask('js-ready', ['copy:ready']);

    grunt.registerTask('default', ['css-ready','js-ready']);

    grunt.registerTask('dist', ['copy:dist']);
};
