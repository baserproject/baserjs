(function () {
	"use strict";

	var global = this;

	var isBrowser = 'document' in global;
	var isWebWorkers = 'WorkerLocation' in global;
	var isNode = 'process' in global;

	var jQuery, $;

	if (isBrowser) {
		$ = jQuery = global.jQuery;
	} else if (isNode) {
		$ = jQuery = require('jquery');
	}

	if (!isBrowser) {
		throw new Error('baserJS requires a window with a document');
	}
