// // import browserEnv from 'browser-env';
// // browserEnv();
// const browserEnv = require('browser-env');
// browserEnv();

import browserEnv from 'browser-env';
browserEnv();
const $ = (html) => {
	const _ = document.createElement('div');
	_.innerHTML = html;
	return _.children[0];
};

export { $, window, document, navigator };
