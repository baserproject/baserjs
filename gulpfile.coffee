gulp = require 'gulp'
webpack = require 'webpack-stream'
ts = require 'gulp-typescript'
tsc = require 'typescript'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
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
  result.js
    .pipe gulp.dest './lib/'

gulp.task 'pack', ->
  gulp.src './lib/browser.js'
    .pipe webpack output: filename: 'baser.js'
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
