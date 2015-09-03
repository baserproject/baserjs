import BaserElement = require('./BaserElement');
import GoogleMapsOption = require('../Interface/GoogleMapsOption');

/**
 * マップ要素
 *
 * @version 0.8.0
 * @since 0.0.6
 *
 */
class GoogleMaps extends BaserElement {

	/**
	 * 初期設定用の緯度
	 * 東京都庁
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	static defaultLat: number = 35.681382;

	/**
	 * 初期設定用の経度
	 * 東京都庁
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	static defaultLng: number = 139.766084;

	/**
	 * 緯度
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 */
	public lat: number;

	/**
	 * 経度
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 */
	public lng: number;

	/**
	 * 管理対象の要素に付加するclass属性値のプレフィックス
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	static className: string = '-bc-map-element';

	/**
	 * 管理するマップ要素リスト
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	static maps: GoogleMaps[] = [];

	/**
	 * Google Mapsのインスタンス
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	public gmap: google.maps.Map;

	/**
	 * インフォウィンドウ
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	public info: google.maps.InfoWindow;

	/**
	 * ピンを置いた座標の要素
	 *
	 * @version 0.0.6
	 * @since 0.0.6
	 *
	 */
	public $coordinates: JQuery;

	/**
	 * マップオプション
	 *
	 * @version 0.0.9
	 * @since 0.0.9
	 *
	 */
	public mapOption: GoogleMapsOption;

	/**
	 * バウンズオブジェクト
	 *
	 * @version 0.6.0
	 * @since 0.6.0
	 *
	 */
	public markerBounds: google.maps.LatLngBounds;

	/**
	 * コンストラクタ
	 *
	 * @version 0.8.0
	 * @since 0.0.6
	 * @param $el 管理するDOM要素のjQueryオブジェクト
	 * @param options マップオプション
	 *
	 */
	constructor ($el: JQuery, options?: GoogleMapsOption) {

		super($el);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		// IE6・7は反映させない
		if (!$el[0].querySelector) {
			return;
		}

		this.$el.addClass(GoogleMaps.className);

		if ('google' in window && google.maps) {
			this.mapOption = $.extend({}, options);
			this._init();
		} else {
			if (console && console.warn) {
				console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
			}
		}

		GoogleMaps.maps.push(this);

		$el.data(GoogleMaps.className, this);

	}

	/**
	 * 初期化
	 *
	 * @version 0.6.0
	 * @since 0.0.6
	 *
	 */
	private _init (): void {

		// data-*属性からの継承
		this.mapOption = <GoogleMapsOption> $.extend(this.mapOption, {
			zoom: this.$el.data('zoom'),
			fitBounds: this.$el.data('fit-bounds')
		});

		this.markerBounds = new google.maps.LatLngBounds();

		var mapCenterLat: number = <number>this.$el.data('lat') || GoogleMaps.defaultLat;
		var mapCenterLng: number = <number>this.$el.data('lng') || GoogleMaps.defaultLng;

		var mapCenterAddress: string = this.$el.data('address') || '';

		if (mapCenterAddress) {
			// 住所から緯度・経度を検索する（非同期）
			GoogleMaps.getLatLngByAddress(mapCenterAddress, (lat: number, lng: number): void => {
				this._render(lat, lng);
			});
		} else {
			this._render(mapCenterLat, mapCenterLng);
		}

	}

	/**
	 * レンダリング
	 *
	 * @version 0.8.0
	 * @since 0.2.0
	 * @param mapCenterLat 緯度
	 * @param mapCenterLng 経度
	 *
	 */
	private _render (mapCenterLat: number, mapCenterLng: number): void {

		this.$coordinates = this.$coordinates || this.$el.find('[data-lat][data-lng], [data-address]').detach();
		if (this.$coordinates.length <= 0) {
			this.$coordinates = this.$el;
		}

		var coordinates: Coordinate[] = [];

		this.$coordinates.each( (i: number, el: HTMLElement): void => {
			var coordinate: Coordinate = new Coordinate(el, this);
			coordinates.push(coordinate);
		});

		this.mapOption = <GoogleMapsOption> $.extend({
			zoom: 14,
			mapTypeControlOptions: <google.maps.MapTypeControlOptions> {
				mapTypeIds: <google.maps.MapTypeId[]> [
					google.maps.MapTypeId.HYBRID,
					google.maps.MapTypeId.ROADMAP
				]
			},
			scrollwheel: <boolean> false,
			center: <google.maps.LatLng> new google.maps.LatLng(mapCenterLat, mapCenterLng),
			styles: null
		}, this.mapOption);

		this.info = new google.maps.InfoWindow({
			disableAutoPan: <boolean> true
		});

		this.gmap = new google.maps.Map(this.$el[0], $.extend({}, this.mapOption, {
			fitBounds: google.maps.Map.prototype.fitBounds
		}));

		$.each(coordinates, (i: number, coordinate: Coordinate ): void => {
			coordinate.markTo( (coordinate: Coordinate): void => {
				if (this.mapOption.fitBounds) {
					this.markerBounds.extend(coordinate.position);
					this.gmap.fitBounds(this.markerBounds);
				}
			});
		});

	}

	/**
	 * 再読み込み・再設定
	 *
	 * @version 0.6.0
	 * @since 0.2.0
	 *
	 */
	public reload (options?: GoogleMapsOption): void {
		this.mapOption = options ?  $.extend({}, options) : this.mapOption;
		this._init();
	}

	/**
	 * 住所文字列から座標を非同期で取得
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 */
	static getLatLngByAddress (address: string, callback: (lat: number, lng: number) => void): void {
		var geocoder: google.maps.Geocoder = new google.maps.Geocoder();
		geocoder.geocode(<google.maps.GeocoderRequest> {
			address: address
		}, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus): void => {
			var lat: number;
			var lng: number;
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
	}

}

/**
 * 座標要素
 *
 * @version 0.8.0
 * @since 0.0.6
 *
 */
class Coordinate {

	public title: string;
	public icon: google.maps.MarkerImage = null;
	public $el: JQuery;
	public lat: number;
	public lng: number;
	public position: google.maps.LatLng; // @since 0.6.0
	public marker: google.maps.Marker;
	private _map: GoogleMaps; // @since 0.8.0
	private _promiseLatLng: JQueryPromise<void>; // @since 0.6.0

	/**
	 * コンストラクタ
	 *
	 * @version 0.8.0
	 * @since 0.0.6
	 *
	 */
	constructor (el: HTMLElement, map: GoogleMaps) {

		this.$el = $(el);

		this._map = map;

		var address: string = this.$el.data('address');

		var dfd: JQueryDeferred<void> = $.Deferred<void>();

		if (address) {
			GoogleMaps.getLatLngByAddress(address, (lat: number, lng: number): void => {
				this.lat = lat;
				this.lng = lng;
				this.position = new google.maps.LatLng(this.lat, this.lng);
				dfd.resolve();
			});
		} else {
			this.lat = <number> this.$el.data('lat');
			this.lng = <number> this.$el.data('lng');
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
	public markTo (callback?: (coordinate: Coordinate) => void): void {
		this._promiseLatLng.done( (): void => {
			this._markTo();
			if (callback) {
				callback(this);
			}
		});
	}

	/**
	 * ピンをマップに立てる
	 *
	 * @version 0.8.1
	 * @since 0.0.6
	 *
	 */
	private _markTo (): void {
		this.title = this.$el.attr('title') || this.$el.data('title') || this.$el.find('h1,h2,h3,h4,h5,h6').text() || null;
		var iconURL: string = this.$el.data('icon');
		var iconSize: string = this.$el.data('iconSize');
		if (iconURL) {
			this.icon = new google.maps.MarkerImage(iconURL);
			if (iconSize) {
				let sizeQ: string[] = iconSize.split(/\s+/);
				let width: number = +sizeQ[0] || null;
				if (width) {
					let height: number = +sizeQ[1] || width;
					let size: google.maps.Size = new google.maps.Size(width, height);
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
			google.maps.event.addListener(this.marker, 'click', (): void => {
				this.openInfoWindow();
			});
		}
	}

	/**
	 * インフォウィンドウを開く
	 *
	 * @version 0.8.0
	 * @since 0.8.0
	 *
	 */
	public openInfoWindow (): void {
		this._map.info.setContent(this.$el[0]);
		this._map.info.open(this._map.gmap, this.marker);
		this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);

		// マップの中心を移動する
		var content: HTMLElement = this._map.info.getContent();
		var proj: google.maps.Projection = this._map.gmap.getProjection();
		var currentPoint: google.maps.Point = proj.fromLatLngToPoint(this.position);
		var scale: number = Math.pow(2, this._map.gmap.getZoom());
		var height: number = $(content).height();
		var y: number = (currentPoint.y * scale - height) / scale;
		var newPoint: google.maps.Point = new google.maps.Point(currentPoint.x, y);
		var newPosition: google.maps.LatLng = proj.fromPointToLatLng(newPoint);
		this._map.gmap.panTo(newPosition);
	}

}

export = GoogleMaps;