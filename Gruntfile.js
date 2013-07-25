module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['scripts/ts/src/**/*.ts'],
                tasks: ['typescript'],
                options: {}
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

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');

    // Here we  go !
    grunt.registerTask('default', ['typescript', 'watch']);
};
