module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        template: {
            dev: {
                src: 'tpl/index.underscore',
                dest: 'index.html',
                variables: {
                    appCache: false
                }
            },
            dist: {
                src: 'tpl/index.underscore',
                dest: 'index.html',
                variables: {
                    appCache: true
                }
            }
        },
        watch: {
           options: {
                forever: true,
                livereload: true
            },
            scripts: {
                files: ['scripts/ts/src/**/*.ts'],
                tasks: ['template', 'typescript'],
                options: {}
            },
            styles: {
                files: ['stylesheets/*.css']
            },
            html: {
                files: ['*.html']
            }
        },
        typescript: {
            base: {
                src: ['scripts/ts/src/**/*.ts'],
                dest: 'scripts/target/app.js',
                options: {
                    base_path: 'scripts/ts/src/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-templater');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');

    // Here we  go !
    grunt.registerTask('default', ['template:dev', 'typescript', 'watch']);
    grunt.registerTask('dist', ['']);
};
