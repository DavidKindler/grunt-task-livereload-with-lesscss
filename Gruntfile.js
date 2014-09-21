'use strict';
 
  var LIVERELOAD_PORT = 35729,
  lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
  mountFolder = function( connect, dir ) {
    return connect.static(require('path').resolve(dir));
  };
 
module.exports = function( grunt ) {
 
  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.initConfig({
     less: {
      development: {
        options: {
          compress: false,
          // yuicompress: true,
          // optimization: 2,
          banner: "/* Updated <%= grunt.template.date ('yyyy-mm-dd') %> */\n"
        },
        files: {
          // target.css file: source.less file
          "css/basecamp.css": "less/basecamp.less"
         

        }
      },
       production: {
        options: {
          // compress: true,
          cleancss: true,
          ieCompat: true,
          // yuicompress: true,
          // optimization: 2,
          banner: "/* Updated <%= grunt.template.date ('yyyy-mm-dd') %> */\n"
        },
        files: {
          // target.css file: source.less file
          "css/basecamp.min.css": "less/basecamp.less"
        }
      }
    },
    watch: {
      livereload: {
        files: [
          '{,*/}*.html',
          'static/{,*/}*.{css,js,png,jpg,gif,svg}'
        ],
        // tasks: ['less'],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
        // nospawn: true,
        livereload: LIVERELOAD_PORT
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function( connect ) {
            return [
              lrSnippet,
              mountFolder(connect, './')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });
 
  grunt.registerTask('server', function() {
    grunt.task.run([
      'connect:livereload',
      'open',
      'watch'
    ]);
  });
 
  grunt.registerTask('default', [ 'server' ]);
  grunt.registerTask('watchLess', ['watch:styles']);
};