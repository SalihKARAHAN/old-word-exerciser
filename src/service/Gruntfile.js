module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            compile_ts: {
                command: 'tsc'
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['wwwroot/Contents/**'],
                    dest: 'build/'
                }]
            }
        },
        clean: ['build/']
    });

    grunt.registerTask('build', ['clean', 'shell:compile_ts', 'copy']);
};
