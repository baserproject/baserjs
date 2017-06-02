"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaserElement_1 = require("./BaserElement");
var Timer_1 = require("./Timer");
var linkTo_1 = require("../fn/linkTo");
/**
 * マップ要素
 *
 * @version 1.0.0
 * @since 0.0.6
 *
 */
var GoogleMaps = (function (_super) {
    __extends(GoogleMaps, _super);
    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.0.6
     * @param el 管理するDOM要素
     * @param options マップオプション
     *
     */
    function GoogleMaps(el, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, el) || this;
        /**
         * data-{*}-state属性のキー
         */
        _this.stateKeyName = 'google-maps';
        if (!('google' in window && google.maps)) {
            throw new ReferenceError("\"//maps.google.com/maps/api/js\" \u3092\u5148\u306B\u8AAD\u307F\u8FBC\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002");
        }
        _this._init(options)
            .then(_this.inViewportFirstTime(_this._config.scrollSpy === 'render'))
            .then(_this._render.bind(_this))
            .then(_this.inViewportFirstTime(_this._config.scrollSpy === 'pin'))
            .then(_this._pin.bind(_this));
        return _this;
    }
    /**
     * 住所文字列から座標を非同期で取得
     *
     * @version 1.0.0
     * @since 0.2.0
     *
     */
    GoogleMaps.getLatLngByAddress = function (address) {
        return new Promise(function (resolve, reject) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address }, function (results, status) {
                switch (status) {
                    case google.maps.GeocoderStatus.OK: {
                        var lat = results[0].geometry.location.lat();
                        var lng = results[0].geometry.location.lng();
                        resolve(new google.maps.LatLng(lat, lng));
                        break;
                    }
                    case google.maps.GeocoderStatus.INVALID_REQUEST: {
                        reject(new Error("\"" + address + "\u306F\u4E0D\u6B63\u306A\u4F4F\u6240\u3060\u3063\u305F\u305F\u3081\u7D50\u679C\u3092\u8FD4\u3059\u3053\u3068\u304C\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002"));
                        break;
                    }
                    case google.maps.GeocoderStatus.ZERO_RESULTS: {
                        reject(new Error("\"" + address + "\u306F\u7D50\u679C\u304C0\u4EF6\u3067\u3057\u305F\u3002\u3002"));
                        break;
                    }
                    case google.maps.GeocoderStatus.OVER_QUERY_LIMIT: {
                        reject(new Error("\u30EA\u30AF\u30A8\u30B9\u30C8\u6570\u306E\u4E0A\u9650\u3092\u8D85\u3048\u307E\u3057\u305F\u3002" + address + "\u306F\u51E6\u7406\u3055\u308C\u307E\u305B\u3093\u3002"));
                        break;
                    }
                    // case google.maps.GeocoderStatus.ERROR:
                    // case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                    default: {
                        reject(new Error("\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002" + address + "\u306F\u51E6\u7406\u3055\u308C\u307E\u305B\u3093\u3002"));
                    }
                }
            });
        });
    };
    /**
     * 初期化
     *
     * @version 1.0.0
     * @since 0.0.6
     *
     */
    GoogleMaps.prototype._init = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.detachChildren();
                        this._config = this.merge({
                            lat: undefined,
                            lng: undefined,
                            address: undefined,
                            zoom: 14,
                            mapTypeControlOptions: {
                                mapTypeIds: [
                                    google.maps.MapTypeId.HYBRID,
                                    google.maps.MapTypeId.ROADMAP,
                                ],
                            },
                            scrollwheel: false,
                            styles: [],
                            disableDefaultUI: false,
                            fitBounds: false,
                            pin: true,
                            scrollSpy: undefined,
                        }, options);
                        if (!(typeof this._config.lat === 'number'
                            &&
                                typeof this._config.lng === 'number')) return [3 /*break*/, 1];
                        return [2 /*return*/, new google.maps.LatLng(this._config.lat, this._config.lng)];
                    case 1:
                        if (!this._config.address) return [3 /*break*/, 3];
                        return [4 /*yield*/, GoogleMaps.getLatLngByAddress(this._config.address)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: throw new TypeError("\"Latitude and Longitude are to expect numeric value.\"");
                }
            });
        });
    };
    /**
     * レンダリング
     *
     * @version 1.0.0
     * @since 0.2.0
     * @param lat 緯度
     * @param lng 経度
     *
     */
    GoogleMaps.prototype._render = function (center) {
        this._gmap = new google.maps.Map(this.el, {
            zoom: this._config.zoom,
            mapTypeControlOptions: this._config.mapTypeControlOptions,
            center: center,
            scrollwheel: this._config.scrollwheel,
            styles: this._config.styles,
            disableDefaultUI: this._config.disableDefaultUI,
        });
        return Promise.resolve(center);
    };
    GoogleMaps.prototype._pin = function (center) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pins, centerEl, markerBounds, i, _i, pins_1, pin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pins = this.detachedChildrenMap(function (el) { return new Pin(el, _this); });
                        if (this._config.pin) {
                            centerEl = document.createElement('div');
                            centerEl.setAttribute('lat', "" + center.lat());
                            centerEl.setAttribute('lng', "" + center.lng());
                            pins.unshift(new Pin(centerEl, this));
                        }
                        markerBounds = new google.maps.LatLngBounds();
                        i = 1;
                        _i = 0, pins_1 = pins;
                        _a.label = 1;
                    case 1:
                        if (!(_i < pins_1.length)) return [3 /*break*/, 4];
                        pin = pins_1[_i];
                        return [4 /*yield*/, pin.markTo(this._gmap, i * 400)];
                    case 2:
                        _a.sent();
                        markerBounds.extend(pin.position);
                        i++;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (this._config.fitBounds) {
                            this._gmap.fitBounds(markerBounds);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return GoogleMaps;
}(BaserElement_1.default));
exports.default = GoogleMaps;
/**
 * 座標要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */
var Pin = (function (_super) {
    __extends(Pin, _super);
    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.0.6
     * @param el 対象のDOM要素
     * @param map GoogleMaps要素
     *
     */
    function Pin(el, map) {
        var _this = _super.call(this, el) || this;
        _this._map = map;
        _this._ready = _this._init();
        return _this;
    }
    /**
     * ピンをマップに立てる
     *
     * @version 1.0.0
     * @since 0.0.6
     * @param callback 位置情報が取得できた後に実行するコールバック
     *
     */
    Pin.prototype.markTo = function (map, delayTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._ready
                        .then(Timer_1.default.delay(delayTime))
                        .then(this._markTo(map))];
            });
        });
    };
    /**
     * @version 1.0.0
     * @since 1.0.0
     */
    Pin.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address, _a, lat, lng;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        address = this.pullProp('address');
                        if (!address) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, GoogleMaps.getLatLngByAddress(address)];
                    case 1:
                        _a.position = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        lat = this.pullProp('lat');
                        lng = this.pullProp('lng');
                        this.position = new google.maps.LatLng(lat, lng);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ピンをマップに立てる
     *
     * @version 1.0.0
     * @since 0.0.6
     *
     */
    Pin.prototype._markTo = function (map) {
        var _this = this;
        return function () {
            var titleAttr = _this.pullProp('title');
            var heading = _this.el.querySelector('h1,h2,h3,h4,h5,h6');
            var headingText = heading ? heading.textContent : '';
            var title = titleAttr || headingText || '';
            var iconURL = _this.pullProp('icon');
            var iconSize = _this.pullProp('iconSize');
            var href = _this.pullProp('href');
            var target = _this.pullProp('target') === '_blank';
            var markerOption = {
                position: _this.position,
                title: title,
                animation: google.maps.Animation.DROP,
            };
            if (iconURL) {
                markerOption.icon = {
                    url: iconURL,
                };
                if (iconSize) {
                    var sizeQ = ("" + iconSize).split(/\s+/);
                    var width = +sizeQ[0] || null;
                    if (width != null) {
                        var height = +sizeQ[1] || width;
                        var size = new google.maps.Size(width, height);
                        markerOption.icon.size = size;
                        markerOption.icon.scaledSize = size;
                    }
                }
            }
            var marker = new google.maps.Marker(markerOption);
            marker.setMap(map);
            if (href) {
                google.maps.event.addListener(marker, 'click', linkTo_1.default(href, target));
            }
            else if (_this.el !== _this._map.el) {
                google.maps.event.addListener(marker, 'click', _this._openInfoWindow(map, marker));
            }
        };
    };
    /**
     * インフォウィンドウを開く
     *
     * @version 1.0.0
     * @since 0.8.0
     *
     */
    Pin.prototype._openInfoWindow = function (map, marker) {
        var _this = this;
        return function () {
            var info = new google.maps.InfoWindow({ disableAutoPan: true });
            info.setContent(_this.el);
            info.open(map, marker);
            marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            // マップの中心を移動する
            var content = info.getContent();
            var proj = map.getProjection();
            var currentPoint = proj.fromLatLngToPoint(_this.position);
            var scale = Math.pow(2, map.getZoom());
            var height = typeof content === 'string' ? 0 : content.getBoundingClientRect().height;
            var y = (currentPoint.y * scale - height) / scale;
            var newPoint = new google.maps.Point(currentPoint.x, y);
            var newPosition = proj.fromPointToLatLng(newPoint);
            map.panTo(newPosition);
        };
    };
    return Pin;
}(BaserElement_1.default));
