import baser = require('./baser');
window['baser'] = baser;

import JQueryAdapter = require('./Class/JQueryAdapter');
$.extend($, JQueryAdapter);
$.extend($.fn, JQueryAdapter.prototype);
