var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaserElement = require('./BaserElement');
/**
 * マップ要素
 *
 * @version 0.8.0
 * @since 0.0.6
 *
 */
var GoogleMaps = (function (_super) {
    __extends(GoogleMaps, _super);
    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.0.6
     * @param el 管理するDOM要素
     * @param options マップオプション
     *
     */
    function GoogleMaps(el, options) {
        _super.call(this, el);
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        this.$el.addClass(GoogleMaps.className);
        if ('google' in window && google.maps) {
            this.mapOption = $.extend({}, options);
            this._init();
        }
        else {
            if (console && console.warn) {
                console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
            }
        }
        GoogleMaps.maps.push(this);
        this.$el.data(GoogleMaps.className, this);
    }
    /**
     * 初期化
     *
     * @version 0.6.0
     * @since 0.0.6
     *
     */
    GoogleMaps.prototype._init = function () {
        var _this = this;
        // data-*属性からの継承
        this.mapOption = $.extend(this.mapOption, {
            zoom: this.$el.data('zoom'),
            fitBounds: this.$el.data('fit-bounds')
        });
        this.markerBounds = new google.maps.LatLngBounds();
        var mapCenterLat = this.$el.data('lat') || GoogleMaps.defaultLat;
        var mapCenterLng = this.$el.data('lng') || GoogleMaps.defaultLng;
        var mapCenterAddress = this.$el.data('address') || '';
        if (mapCenterAddress) {
            // 住所から緯度・経度を検索する（非同期）
            GoogleMaps.getLatLngByAddress(mapCenterAddress, function (lat, lng) {
                _this._render(lat, lng);
            });
        }
        else {
            this._render(mapCenterLat, mapCenterLng);
        }
    };
    /**
     * レンダリング
     *
     * @version 0.8.0
     * @since 0.2.0
     * @param mapCenterLat 緯度
     * @param mapCenterLng 経度
     *
     */
    GoogleMaps.prototype._render = function (mapCenterLat, mapCenterLng) {
        var _this = this;
        this.$coordinates = this.$coordinates || this.$el.find('[data-lat][data-lng], [data-address]').detach();
        if (this.$coordinates.length <= 0) {
            this.$coordinates = this.$el;
        }
        var coordinates = [];
        this.$coordinates.each(function (i, el) {
            var coordinate = new Coordinate(el, _this);
            coordinates.push(coordinate);
        });
        this.mapOption = $.extend({
            zoom: 14,
            mapTypeControlOptions: {
                mapTypeIds: [
                    google.maps.MapTypeId.HYBRID,
                    google.maps.MapTypeId.ROADMAP
                ]
            },
            scrollwheel: false,
            center: new google.maps.LatLng(mapCenterLat, mapCenterLng),
            styles: null
        }, this.mapOption);
        this.info = new google.maps.InfoWindow({
            disableAutoPan: true
        });
        this.gmap = new google.maps.Map(this.$el[0], $.extend({}, this.mapOption, {
            fitBounds: google.maps.Map.prototype.fitBounds
        }));
        $.each(coordinates, function (i, coordinate) {
            coordinate.markTo(function (coordinate) {
                if (_this.mapOption.fitBounds) {
                    _this.markerBounds.extend(coordinate.position);
                    _this.gmap.fitBounds(_this.markerBounds);
                }
            });
        });
    };
    /**
     * 再読み込み・再設定
     *
     * @version 0.6.0
     * @since 0.2.0
     *
     */
    GoogleMaps.prototype.reload = function (options) {
        this.mapOption = options ? $.extend({}, options) : this.mapOption;
        this._init();
    };
    /**
     * 住所文字列から座標を非同期で取得
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    GoogleMaps.getLatLngByAddress = function (address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: address
        }, function (results, status) {
            var lat;
            var lng;
            switch (status) {
                case google.maps.GeocoderStatus.OK:
                    lat = results[0].geometry.location.lat();
                    lng = results[0].geometry.location.lng();
                    break;
                case google.maps.GeocoderStatus.INVALID_REQUEST:
                case google.maps.GeocoderStatus.ZERO_RESULTS:
                case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
                    if (console && console.warn) {
                        console.warn('ReferenceError: "' + address + 'は不正な住所のだったため結果を返すことができませんでした。"');
                    }
                    break;
                case google.maps.GeocoderStatus.ERROR:
                case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                    if (console && console.warn) {
                        console.warn('Error: "エラーが発生しました。"');
                    }
                    break;
            }
            callback(lat, lng);
        });
    };
    /**
     * 初期設定用の緯度
     * 東京都庁
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    GoogleMaps.defaultLat = 35.681382;
    /**
     * 初期設定用の経度
     * 東京都庁
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    GoogleMaps.defaultLng = 139.766084;
    /**
     * 管理対象の要素に付加するclass属性値のプレフィックス
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    GoogleMaps.className = '-bc-map-element';
    /**
     * 管理するマップ要素リスト
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    GoogleMaps.maps = [];
    return GoogleMaps;
})(BaserElement);
/**
 * 座標要素
 *
 * @version 0.8.0
 * @since 0.0.6
 *
 */
var Coordinate = (function () {
    /**
     * コンストラクタ
     *
     * @version 0.8.0
     * @since 0.0.6
     *
     */
    function Coordinate(el, map) {
        var _this = this;
        this.icon = null;
        this.$el = $(el);
        this._map = map;
        var address = this.$el.data('address');
        var dfd = $.Deferred();
        if (address) {
            GoogleMaps.getLatLngByAddress(address, function (lat, lng) {
                _this.lat = lat;
                _this.lng = lng;
                _this.position = new google.maps.LatLng(_this.lat, _this.lng);
                dfd.resolve();
            });
        }
        else {
            this.lat = this.$el.data('lat');
            this.lng = this.$el.data('lng');
            this.position = new google.maps.LatLng(this.lat, this.lng);
            dfd.resolve();
        }
        this._promiseLatLng = dfd.promise();
    }
    /**
     * ピンをマップに立てる
     *
     * @version 0.8.0
     * @since 0.0.6
     *
     */
    Coordinate.prototype.markTo = function (callback) {
        var _this = this;
        this._promiseLatLng.done(function () {
            _this._markTo();
            if (callback) {
                callback(_this);
            }
        });
    };
    /**
     * ピンをマップに立てる
     *
     * @version 0.8.1
     * @since 0.0.6
     *
     */
    Coordinate.prototype._markTo = function () {
        var _this = this;
        this.title = this.$el.attr('title') || this.$el.data('title') || this.$el.find('h1,h2,h3,h4,h5,h6').text() || null;
        var iconURL = this.$el.data('icon');
        var iconSize = this.$el.data('iconSize');
        if (iconURL) {
            this.icon = new google.maps.MarkerImage(iconURL);
            if (iconSize) {
                var sizeQ = iconSize.split(/\s+/);
                var width = +sizeQ[0] || null;
                if (width) {
                    var height = +sizeQ[1] || width;
                    var size = new google.maps.Size(width, height);
                    this.icon.size = size;
                    this.icon.scaledSize = size;
                }
            }
        }
        this.marker = new google.maps.Marker({
            position: this.position,
            title: this.title,
            icon: this.icon,
            map: this._map.gmap
        });
        if (this._map.$coordinates !== this._map.$el) {
            google.maps.event.addListener(this.marker, 'click', function () {
                _this.openInfoWindow();
            });
        }
    };
    /**
     * インフォウィンドウを開く
     *
     * @version 0.8.0
     * @since 0.8.0
     *
     */
    Coordinate.prototype.openInfoWindow = function () {
        this._map.info.setContent(this.$el[0]);
        this._map.info.open(this._map.gmap, this.marker);
        this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
        // マップの中心を移動する
        var content = this._map.info.getContent();
        var proj = this._map.gmap.getProjection();
        var currentPoint = proj.fromLatLngToPoint(this.position);
        var scale = Math.pow(2, this._map.gmap.getZoom());
        var height = $(content).height();
        var y = (currentPoint.y * scale - height) / scale;
        var newPoint = new google.maps.Point(currentPoint.x, y);
        var newPosition = proj.fromPointToLatLng(newPoint);
        this._map.gmap.panTo(newPosition);
    };
    return Coordinate;
})();
module.exports = GoogleMaps;
