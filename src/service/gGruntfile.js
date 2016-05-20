module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '<% pkg.name %> - <% pkg.version %> \n'
                      + '<% pkg.author %> '
                      + '<% grunt.template.today("dd-mm-yyyy") %>'
            }
        },
        build: {

        }
    });
}
