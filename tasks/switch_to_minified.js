/*
 * grunt-switch-to-minified
 * https://github.com/saadin/switch_to_minified
 *
 * Copyright (c) 2015 saadin
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');

module.exports = function(grunt) {
    var chalk = require('chalk');

    grunt.registerMultiTask('switch_to_minified', 'change url of static files to minified one', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            separator: grunt.util.linefeed
        });

        //groups:
        // 1 -> before (including some part of path)
        // 2 -> part of path to be replaced
        // 3 -> rest of path
        // 4 -> file name
        // 5 -> extension
        // 6 -> after
        // 7 -> quote/double quote/ ? character for get params
        // 8 -> after 7

        // Iterate over all src-dest file pairs.
        this.files.forEach(function(f) {
            if(!f.sourceTypes)f.sourceTypes = 'js|css';
            if(!f.exclude)f.exclude = [];
            if(!f.pathToReplace)f.pathToReplace = '';
            if(!f.targetPath)f.targetPath = '';
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function(filepath) {
                var validRegexList  = [];
                var invalidRegexList = [];
                f.sourceTypes.split('|').forEach(function(type){
                    var ext = '\\.' + type;
                    if(type == 'css'){
                        validRegexList.push({
                            regex: new RegExp("(.*<link.*href=.*)(" + f.pathToReplace + ")(.*?/?([^/\\s]+))("+ext+")(('|\"|\\?)(.*))","i"),
                            type: type
                        });
                        invalidRegexList.push(new RegExp("(.*<link.*href=.*)("+'\\.min'+ext+")(('|\"|\\?)(.*))","i"));
                    } else if(type == 'js'){
                        validRegexList.push({
                            regex: new RegExp("(.*<script.*src=.*)(" + f.pathToReplace + ")(.*?/?([^/\\s]+))("+ext+")(('|\"|\\?)(.*))","i"),
                            type: type
                        });
                        invalidRegexList.push(new RegExp("(.*<script.*src=.*)("+'\\.min'+ext+")(('|\"|\\?)(.*))","i"));
                    }
                });

                // Read file source.
                var src = grunt.file.read(filepath);
                //grunt.log.writeln(chalk.cyan(filepath));
                var new_src = [];
                src.split('\n').forEach(function(line){
                    var invalid = false;

                    invalidRegexList.forEach(function(regex){
                        if(line.match(regex)){
                            invalid = true;
                        }
                    });
                    if(!invalid){
                        validRegexList.forEach(function(valid){
                            var match = line.match(valid.regex);
                            if(match && line.trim().indexOf('{#') !== 0) {
                                if(f.exclude) {
                                    f.exclude.forEach(function (exc) {
                                        if (match[4].indexOf(exc) >= 0) {
                                            invalid = true;
                                        }
                                    });
                                }
                                if(!invalid){
                                    line = line.replace(valid.regex, '$1'+ f.targetPath + '$3.min.' + valid.type +'$6');
                                }
                            }
                        });
                    }
                    new_src.push(line);
                });
                grunt.file.write(filepath, new_src.join('\n'));
                //grunt.log.writeln('');
                return src;
            });

        });
        //grunt.log.writeln('----------------');
    });

};

