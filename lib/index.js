"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaserElement_1 = require("./Classes/BaserElement");
var GoogleMaps_1 = require("./Classes/GoogleMaps");
var Sequencer_1 = require("./Classes/Sequencer");
var YouTube_1 = require("./Classes/YouTube");
exports.BaserElement = BaserElement_1.default;
exports.GoogleMaps = GoogleMaps_1.default;
exports.Sequencer = Sequencer_1.default;
exports.YouTube = YouTube_1.default;
function auto() {
    return new Promise(function (resolve) {
        if (document.readyState !== 'loading') {
            _auto();
            resolve();
            return;
        }
        addEventListener('DOMContentLoaded', function () {
            _auto();
            resolve();
        });
    });
}
exports.auto = auto;
function _auto() {
    var nodesGoogleMaps = document.querySelectorAll('[data-baser="google-maps"]');
    for (var _i = 0, _a = Array.from(nodesGoogleMaps); _i < _a.length; _i++) {
        var node = _a[_i];
        var g = new exports.GoogleMaps(node);
    }
    var nodesYouTube = document.querySelectorAll('[data-baser="youtube"]');
    for (var _b = 0, _c = Array.from(nodesYouTube); _b < _c.length; _b++) {
        var node = _c[_b];
        var g = new exports.YouTube(node);
    }
}
