gulp = require 'gulp'
webpack = require 'gulp-webpack'
ts = require 'gulp-typescript'
tsc = require 'typescript'
typedoc = require 'gulp-typedoc'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
header = require 'gulp-header'
qunit = require 'gulp-qunit'
moment = require 'moment'
runSequence = require 'run-sequence'

pkg = require './package.json'
banner = """/**!
	* <%= pkg.name %> - v<%= pkg.version %> r<%= parseInt(pkg.revision, 10) + 1 %>
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
		.pipe ts project 
	result.js
		.pipe gulp.dest './dist/'

gulp.task 'pack', ->
	gulp.src 'dist/src/baserJS.js'
		.pipe webpack output: filename: 'baser.js'
		.pipe header banner, pkg: pkg, moment: moment
		.pipe gulp.dest './'

gulp.task 'compress', ->
	gulp.src './baser.js'
		.pipe uglify()
		.pipe rename 'baser.min.js'
		.pipe header banner, pkg: pkg, moment: moment
		.pipe gulp.dest './'
		
gulp.task 'test', ->
	gulp.src './test/*.html'
		.pipe qunit timeout: 30

gulp.task 'docs', ->
	gulp.src './src/baserJS.ts'
		.pipe typedoc
			module: 'commonjs'
			target: 'ES5'
			includeDeclarations: on
			mode: 'file'
			out: 'docs'

gulp.task 'dev-ts', (cb) -> runSequence(
	'ts',
	cb
)

gulp.task 'dev-web', (cb) -> runSequence(
	'ts',
	'pack',
	cb
)

gulp.task 'watch', ->
	gulp.watch 'src/**/*.ts', ['dev-web']

gulp.task 'build', (cb) -> runSequence(
	'ts',
	'pack',
	'compress',
	cb
)

gulp.task 'default', (cb) -> runSequence(
	'build',
	'test',
	cb
)
	