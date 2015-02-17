module baser {

	export module ui {

		export module element {

			/**
			 * MapOptionクラスのオプションハッシュのインターフェイス
			 *
			 * @version 0.0.9
			 * @since 0.0.9
			 *
			 */
			export interface MapOption {

				/**
				 * ズーム率
				 *
				 * @version 0.0.9
				 * @since 0.0.9
				 *
				 */
				zoom?: number;

				/**
				 * マップのコントロールオプション
				 *
				 * @version 0.0.9
				 * @since 0.0.9
				 *
				 */
				mapTypeControlOptions?: google.maps.MapTypeControlOptions;

				/**
				 * スクロールホイールが有効かどうか
				 *
				 * @version 0.0.9
				 * @since 0.0.9
				 *
				 */
				scrollwheel?: boolean;

				/**
				 * 地図の中央の座標
				 *
				 * @version 0.0.9
				 * @since 0.0.9
				 *
				 */
				center?: google.maps.LatLng;

				/**
				 * 地図のスタイル
				 *
				 * @version 0.0.9
				 * @since 0.0.9
				 *
				 */
				styles?: google.maps.MapTypeStyle[];

			}

			/**
			 * マップ要素
			 *
			 * @version 0.0.6
			 * @since 0.0.6
			 *
			 */
			export class Map extends Element {

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
				static maps: Map[] = [];

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
				public mapOption: MapOption;

				/**
				 * コンストラクタ
				 *
				 * @version 0.0.9
				 * @since 0.0.6
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options マップオプション
				 *
				 */
				constructor ($el: JQuery, options?: MapOption) {

					super($el);

					this.$el.addClass(Map.className);

					if ('google' in window && google.maps) {
						this.mapOption = options;
						this._init();
					} else {
						if (console && console.warn) {
							console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
						}
					}

					Map.maps.push(this);

					$el.data(Map.className, this);

				}

				/**
				 * 初期化
				 *
				 * @version 0.2.0
				 * @since 0.0.6
				 *
				 */
				private _init (): void {

					var mapCenterLat: number = <number>this.$el.data('lat') || Map.defaultLat;
					var mapCenterLng: number = <number>this.$el.data('lng') || Map.defaultLng;

					var mapCenterAddress: string = this.$el.data('address') || '';

					if (mapCenterAddress) {
						// 住所から緯度・経度を検索する（非同期）
						Map.getLatLngByAddress(mapCenterAddress, (lat: number, lng: number): void => {
							this._render(lat, lng);
						});
					} else {
						this._render(mapCenterLat, mapCenterLng);
					}

				}

				/**
				 * レンダリング
				 *
				 * @version 0.2.1
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
						var $this: JQuery = $(el);
						var coordinate: Coordinate = new Coordinate($this);
						coordinates.push(coordinate);
					});

					this.mapOption = <MapOption> $.extend({
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

					this.gmap = new google.maps.Map(this.$el[0], this.mapOption);

					$.each(coordinates, (i: number, coordinate: Coordinate ): void => {
						coordinate.markTo(this);
					});
				}

				public reload (options?: MapOption): void {
					this.mapOption = options;
					this._init();
				}

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
			 * @version 0.0.6
			 * @since 0.0.6
			 *
			 */
			class Coordinate {

				public title: string;
				public icon: string;
				public $el: JQuery;
				public lat: number;
				public lng: number;
				public marker: google.maps.Marker;
				public promiseLatLng: JQueryPromise<void>;

				constructor ($el: JQuery) {

					var address: string = $el.data('address');

					var dfd: JQueryDeferred<void> = $.Deferred<void>();

					this.$el = $el;

					if (address) {
						Map.getLatLngByAddress(address, (lat: number, lng: number): void => {
							this.lat = lat;
							this.lng = lng;
							dfd.resolve();
						});
					} else {
						this.lat = <number> $el.data('lat');
						this.lng = <number> $el.data('lng');
						dfd.resolve();
					}

					this.promiseLatLng = dfd.promise();

				}

				public markTo (map: Map): void {
					this.promiseLatLng.done((): void => {
						this._markTo(map);
					});
				}

				private _markTo (map: Map): void {
					this.title = this.$el.attr('title') || this.$el.data('title') || this.$el.find('h1,h2,h3,h4,h5,h6').text() || null;
					this.icon = this.$el.data('icon') || null;
					this.marker = new google.maps.Marker({
						position: new google.maps.LatLng(this.lat, this.lng),
						title: this.title,
						icon: this.icon,
						map: map.gmap
					});
					if (map.$coordinates !== map.$el) {
						google.maps.event.addListener(this.marker, 'click', (): void => {
							map.info.setContent(this.$el[0]);
							map.info.open(map.gmap, this.marker);
							this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
						});
					}
				}

			}

		}

	}

}
