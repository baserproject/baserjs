module.exports = function(grunt) {

  const DEST = 'baser.js';
  const DEST_MIN = 'baser.min.js';

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    meta: {
      banner:
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> r<%= parseInt(pkg.revision, 10) + 1 %>\n' +
        ' * update: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * Author: <%= pkg.author %> [<%= pkg.website %>]\n' +
        ' * Github: <%= pkg.repository.url %>\n' +
        ' * License: Licensed under the <%= pkg.license %> License\n' +
        ' */'
    },
    typescript: {
      options: {
        comments: true,
        declaration: true
      },
      dist: {
        src: 'src/index.ts',
        dest: DEST
      }
    },
    uglify: {
      dist: {
        options: {
          banner: '<%= meta.banner %>' + '\n' +
          '\n' +
          '',
          report: 'gzip',
          sourceMap: true
        },
        src: [DEST],
        dest: DEST_MIN
      },
    },
    concat: {
      lib: {
        src: [
          'src/lib/jquery-cookie/src/jquery.cookie.js',
          'src/lib/jquery-mousewheel/jquery.mousewheel.js'
        ],
        dest: 'src/__tmp/__lib.js'
      },
      dist: {
        options: {
          banner: '<%= meta.banner %>' + '\n' +
          '\n' +
          ''
        },
        src: [
          'src/__wrap/__intro.js',
          '<%= concat.lib.dest %>',
          '<%= typescript.dist.dest %>',
          'src/__wrap/__outro.js'
        ],
        dest: DEST
      }
    },
    watch: {
      scripts: {
        files: [
          'src/*.ts',
          'src/**/*.ts',
        ],
        tasks: [
          'typescript',
          'concat:lib',
          'concat:dist'
        ],
        options: {
          interrupt: true
        }
      }
    },
    clean: {
      options: {
        force: true
      },
      docs: {
        src: [
          'docs/'
        ]
      }
    },
    typedoc: {
      build: {
        options: {
          out: 'docs/',
          name: '<%= pkg.name %>',
          gaID: 'UA-56482699-1',
          mode: 'file'
        },
        src: 'src/index.ts'
      }
    },
    dtsm: {
      main: {
        options: {
          config: 'dtsm.json'
        }
      }
    },
    qunit: {
      all: [
        'test/*.html'
      ]
    }
  });

  grunt.registerTask('default', [
    'typescript',
    'concat:lib',
    'concat:dist',
    'uglify',
    'qunit',
    'clean:docs',
    'typedoc',
    'update'
  ]);

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-typedoc');
  grunt.loadNpmTasks('grunt-dtsm');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.registerTask('update', 'Update Revision', function() {
    pkg.revision = parseInt(pkg.revision, 10) + 1;
    return grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
  });
};
