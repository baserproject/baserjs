gulp = require 'gulp'
webpackGulp = require 'webpack-stream'
webpack = require 'webpack'
ts = require 'gulp-typescript'
tsc = require 'typescript'
header = require 'gulp-header'
moment = require 'moment'
runSequence = require 'run-sequence'
git = require 'git-rev-sync'

pkg = require './package.json'
banner = """/**!
  * <%= pkg.name %> - v<%= pkg.version %>
  * revision: <%= git.long() %>
  * update: <%= moment().format("YYYY-MM-DD") %>
  * Author: <%= pkg.author %> [<%= pkg.website %>]
  * Github: <%= pkg.repository.url %>
  * License: Licensed under the <%= pkg.license %> License
  */

"""

project = ts.createProject './tsconfig.json',
  typescript: tsc

gulp.task 'ts', ->
  result = project.src()
    .pipe project()
    .pipe gulp.dest './lib/'

gulp.task 'pack', ->
  gulp.src './lib/browser.js'
    .pipe webpackGulp({
      plugins: [
        new webpack.optimize.AggressiveMergingPlugin()
        # new webpack.optimize.UglifyJsPlugin()
      ]
      output: filename: 'baser.js'
    }, webpack)
    .pipe header banner, pkg: pkg, moment: moment, git: git
    .pipe gulp.dest './dist/'
    .pipe gulp.dest "./dist/v#{pkg.version}/"

gulp.task 'dev-ts', (cb) -> runSequence(
  'ts',
  'pack',
  cb
)

gulp.task 'watch', ->
  gulp.watch 'src/**/*.ts', ['dev-ts']

gulp.task 'w', ['watch']

gulp.task 'build', (cb) -> runSequence(
  'ts',
  'pack',
  cb
)

gulp.task 'default', (cb) -> runSequence(
  'build',
  cb
)
