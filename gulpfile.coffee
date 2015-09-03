gulp = require 'gulp'
webpack = require 'gulp-webpack'
ts = require 'gulp-typescript'
typedoc = require 'gulp-typedoc'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
qunit = require 'gulp-qunit'
runSequence = require 'run-sequence'

project = ts.createProject './tsconfig.json'

gulp.task 'ts', ->
	result = project.src()
		.pipe ts project 
	result.js
		.pipe gulp.dest './dist/'

gulp.task 'pack', ->
	gulp.src 'dist/src/baserJS.js'
		.pipe webpack output: filename: 'baser.js'
		.pipe gulp.dest './'

gulp.task 'compress', ->
	gulp.src './baser.js'
		.pipe uglify preserveComments: 'license'
		.pipe rename 'baser.min.js'
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
	'test',
	cb
)

gulp.task 'default', (cb) -> runSequence(
	'build',
	'test',
	cb
)
	