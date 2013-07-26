module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
           options: {
                forever: true,
                livereload: true
            },
            styles: {
                files: ['stylesheets/*.css']
            },
            html: {
                files: ['*.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    // Here we  go !
    grunt.registerTask('default', ['watch']);
};
