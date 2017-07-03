/// <reference path="../typings/bundle.d.ts" />
"use strict";
var baser = require('./baser');
window['baser'] = baser;
var JQueryAdapter = require('./Class/JQueryAdapter');
$.extend($, JQueryAdapter);
$.extend($.fn, JQueryAdapter.prototype);
