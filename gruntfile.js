module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /** concat transitory files into final js */
        // concat: {
        //  'dist/build.js':'js/**/*.js'

        // },
        /** Lint all CSS */
        csslint: {
            options: {
                'universal-selector': false,
                'qualified-headings': false,
                'unique-headings': false,
                'ids': false,
                'known-properties': false,
                'box-model': false,
                'box-sizing': false,
                'gradients': false,
                'important': false,
                'overqualified-elements': false,
                'font-sizes': false,
                'adjoining-classes': false,
                'bulletproof-font-face': false,
                'compatible-vendor-prefixes': false,
                'vendor-prefix': false,
                'fallback-colors': false,
                'star-property-hack': false,
                'outline-none': false,
                'floats': false,
                'duplicate-properties': false,
                'duplicate-background-images': false,
                'zero-units': false,
                'display-property-grouping': false,
                'text-indent': false,
                'empty-rules': false,
                'font-faces': false
            },
            main: {
                src: ['js/css/*.css']
            }
        },


        jshint: {
            options: {
                jshintrc: '.jshintrc',

            },
            main: [
                'js/**/*.js',
                '!js/vendor/**/*.js'
            ]
        },
        watch: {
            // options: {
            //   livereload: 35724
            // },

            scripts: {
                files: ['js/**/*.js'],
                tasks: ['jshint']
            },


            css: {
                files: ['js/**/*.less'],
                tasks: ['csslint']
            },

        },
        connect: {
            server: {
                options: {

                    // livereload: 35724,
                    port: 8080,
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');



    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-requirejs');








    grunt.registerTask('jshint', ['jshint']);

    grunt.registerTask('default', 'connect:server');

};
