gulp = require 'gulp'
webpack = require 'gulp-webpack'
ts = require 'gulp-typescript'
typedoc = require 'gulp-typedoc'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
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

gulp.task 'docs', ->
	gulp.src 'src/baserJS.ts'
		.pipe typedoc
			target: 'ES5'
			includeDeclarations: on
			mode: 'file'
			out: 'docs'

gulp.task 'watch', ->
	gulp.watch 'src/**/*.ts', ['default']

gulp.task 'default', (cb) -> runSequence(
	'ts',
	'pack',
	'compress',
	cb
)
	