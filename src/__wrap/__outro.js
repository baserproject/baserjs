	if (isNode) {
		module.exports = baser;
	} else {
		global.baser = baser;
	}
}).call((this || 0).self || global);