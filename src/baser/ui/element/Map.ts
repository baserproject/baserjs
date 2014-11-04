module baser {

	export module ui {

		export module element {

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
				static lat: number = 35.681382;

				/**
				 * 初期設定用の経度
				 * 東京都庁
				 *
				 * @version 0.0.6
				 * @since 0.0.6
				 *
				 */
				static lng: number = 139.766084;

				/**
				 * 管理対象の要素に付加するclass属性値のプレフィックス
				 *
				 * @version 0.0.6
				 * @since 0.0.6
				 *
				 */
				static className: string = '-bc-map-element';

				/**
				 * 管理対象の要素
				 *
				 * @version 0.0.6
				 * @since 0.0.6
				 *
				 */
				static maps: Map[] = [];

				/**
				 * 管理対象の要素
				 *
				 * @version 0.0.6
				 * @since 0.0.6
				 *
				 */
				public gmap: google.maps.Map;
				public info: google.maps.InfoWindow;
				public $coordinates: JQuery;
				public mapOption: any;

				/**
				 * コンストラクタ
				 *
				 * @version 0.0.6
				 * @since 0.0.6
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 *
				 */
				constructor ($el: JQuery, options?: any) {

					super($el);

					this.$el.addClass(Map.className);

					if ('google' in window && google.maps) {
						this._init(options);
					} else {
						if (console && console.warn) {
							console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
						}
					}

					Map.maps.push(this);

					$el.data(Map.className, this);

				}

				private _init (options?: any): void {

					var mapCenterLat: number = <number>this.$el.data('lat') || Map.lat;
					var mapCenterLng: number = <number>this.$el.data('lng') || Map.lng;

					this.$coordinates = this.$coordinates || this.$el.find('[data-lat][data-lng]').detach();
					if (this.$coordinates.length <= 0) {
						this.$coordinates = this.$el;
					}

					var coordinates: Coordinate[] = [];

					this.$coordinates.each( (i: number, el: HTMLElement): void => {
						var $this: JQuery = $(el);
						var coordinate: Coordinate = new Coordinate($this);
						coordinates.push(coordinate);
					});

					this.mapOption = this.mapOption || $.extend({
						zoom: 14,
						mapTypeControlOptions: <google.maps.MapTypeControlOptions> {
							mapTypeIds: <google.maps.MapTypeId[]> [
								google.maps.MapTypeId.HYBRID,
								google.maps.MapTypeId.ROADMAP
							]
						},
						scrollwheel: <boolean> false,
						center: <google.maps.LatLng> new google.maps.LatLng(mapCenterLat, mapCenterLng)
					}, options);

					this.info = new google.maps.InfoWindow({
						disableAutoPan: <boolean> true
					});

					this.gmap = new google.maps.Map(this.$el[0], this.mapOption);

					$.each(coordinates, (i:number, coordinate: Coordinate ): void => {
						coordinate.markTo(this);
					});
				}

				public reload (): void {
					this._init();
				}

			}

			class Coordinate {

				public title: string;
				public icon: string;
				public $el: JQuery;
				public lat: number;
				public lng: number;
				public marker: google.maps.Marker;

				constructor ($el: JQuery) {

					this.$el = $el;
					this.lat = <number> $el.data('lat');
					this.lng = <number> $el.data('lng');
					this.title = $el.attr('title') || $el.data('title') || $el.find('h1,h2,h3,h4,h5,h6').text() || null;
					this.icon = $el.data('icon') || null;

				}

				public markTo (map: Map): void {
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