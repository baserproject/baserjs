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
          report: 'min'
        },
        src: [DEST],
        dest: DEST_MIN
      },
    },
    concat: {
      dist: {
        options: {
          banner: '<%= meta.banner %>' + '\n' +
          '\n' +
          ''
        },
        src: [
          'src/__wrap/__intro.js',
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
          'concat'
        ],
        options: {
          interrupt: true
        }
      }
    },
    typedoc: {
      build: {
        options: {
          out: 'docs/',
          name: '<%= pkg.name %>',
          gaID: 'UA-56482699-1'
        },
        src: 'src/index.ts'
      }
    },
    tsd: {
      refresh: {
        options: {
          command: 'reinstall',
          latest: true,
          config: 'tsd.json'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'typescript',
    'concat',
    'uglify',
    'tsd',
    'typedoc',
    'update'
  ]);

  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-typedoc');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('update', 'Update Revision', function() {
    pkg.revision = parseInt(pkg.revision, 10) + 1;
    return grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
  });
};
