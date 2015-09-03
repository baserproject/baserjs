/// <reference path="../typings/bundle.d.ts" />
var baser = require('./baser');
window['baser'] = baser;
var JQueryAdapter = require('./Class/JQueryAdapter');
$.extend($, JQueryAdapter);
$.extend($.fn, JQueryAdapter.prototype);
