import BaserElement from './BaserElement';
import Timer from './Timer';

import linkTo from '../fn/linkTo';

export type GoogleMapsInviewAction = 'render' | 'pin';

/**
 * GoogleMapsクラスのオプションハッシュのインターフェイス
 *
 * @version 0.6.0
 * @since 0.0.9
 *
 */
export interface GoogleMapsOption {

	/**
	 * 緯度
	 *
	 * 数値でない場合は`TypeError`の例外を投げる。
	 */
	lat?: number;

	/**
	 * 経度
	 *
	 * 数値でない場合は`TypeError`の例外を投げる。
	 */
	lng?: number;

	/**
	 * 住所
	 *
	 * Geocoder APIを利用するので検索結果が失敗する可能性がある。
	 * `lat`と`lng`がある場合は無視される。
	 */
	address?: string;

	/**
	 * ズーム率
	 *
	 * `fitBounds`が`true`の場合は無視されます。
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
	 * 地図のスタイル
	 *
	 * @version 0.0.9
	 * @since 0.0.9
	 *
	 */
	styles?: google.maps.MapTypeStyle[];

	/**
	 *
	 */
	disableDefaultUI?: boolean;

	/**
	 * 複数ピンを置いたときに地図内に収まるように
	 * ズームと中心を調整するかどうか
	 *
	 * @version 0.6.0
	 * @since 0.6.0
	 *
	 */
	fitBounds?: boolean;

	/**
	 * ピンを刺すかどうか
	 */
	pin?: boolean;

	/**
	 *
	 */
	scrollSpy?: GoogleMapsInviewAction;

}

/**
 * マップ要素
 *
 * @version 1.0.0
 * @since 0.0.6
 *
 */
export default class GoogleMaps extends BaserElement<HTMLDivElement> {

	/**
	 * 住所文字列から座標を非同期で取得
	 *
	 * @version 1.0.0
	 * @since 0.2.0
	 *
	 */
	public static getLatLngByAddress (address: string) {
		return new Promise<google.maps.LatLng>((resolve, reject) => {
			const geocoder = new google.maps.Geocoder();
			geocoder.geocode({ address }, (results, status): void => {
				switch (status) {
					case google.maps.GeocoderStatus.OK: {
						const lat = results[0].geometry.location.lat();
						const lng = results[0].geometry.location.lng();
						resolve(new google.maps.LatLng(lat, lng));
					}
					break;
					case google.maps.GeocoderStatus.INVALID_REQUEST:
						reject(new Error(`"${address}は不正な住所だったため結果を返すことができませんでした。`));
					break;
					case google.maps.GeocoderStatus.ZERO_RESULTS:
						reject(new Error(`"${address}は結果が0件でした。。`));
					break;
					case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
						reject(new Error(`リクエスト数の上限を超えました。${address}は処理されません。`));
					break;
					// case google.maps.GeocoderStatus.ERROR:
					// case google.maps.GeocoderStatus.UNKNOWN_ERROR:
					default:
						reject(new Error(`エラーが発生しました。${address}は処理されません。`));
				}
			});
		});
	}

	/**
	 * data-{*}-state属性のキー
	 */
	protected stateKeyName = 'google-maps';

	/**
	 * Google Mapsのインスタンス
	 *
	 * @version 1.0.0
	 * @since 0.0.6
	 *
	 */
	private _gmap: google.maps.Map;

	/**
	 * マップオプション
	 *
	 * @version 1.0.0
	 * @since 0.0.9
	 *
	 */
	private _config: GoogleMapsOption;

	/**
	 * コンストラクタ
	 *
	 * @version 1.0.0
	 * @since 0.0.6
	 * @param el 管理するDOM要素
	 * @param options マップオプション
	 *
	 */
	constructor (el: HTMLDivElement, options: GoogleMapsOption = {}) {
		super(el);

		if (!('google' in window && google.maps)) {
			throw new ReferenceError(`"//maps.google.com/maps/api/js" を先に読み込む必要があります。`);
		}

		this._init(options)
			.then(this.inViewportFirstTime(this._config.scrollSpy === 'render'))
			.then(this._render.bind(this))
			.then(this.inViewportFirstTime(this._config.scrollSpy === 'pin'))
			.then(this._pin.bind(this));
	}

	/**
	 * 初期化
	 *
	 * @version 1.0.0
	 * @since 0.0.6
	 *
	 */
	private async _init (options: GoogleMapsOption) {
		this.detachChildren();

		this._config = this.merge<GoogleMapsOption, GoogleMapsOption>(
			{
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
			},
			options,
		);

		if (
			typeof this._config.lat === 'number'
			&&
			typeof this._config.lng === 'number'
		) {
			return new google.maps.LatLng(this._config.lat, this._config.lng);
		} else if (this._config.address) {
			return await GoogleMaps.getLatLngByAddress(this._config.address);
		} else {
			throw new TypeError(`"Latitude and Longitude are to expect numeric value."`);
		}
	}

	/**
	 * レンダリング
	 *
	 * @version 1.0.0
	 * @since 0.2.0
	 * @param lat 緯度
	 * @param lng 経度
	 *
	 */
	private _render (center: google.maps.LatLng) {
		this._gmap = new google.maps.Map(this.el, {
			zoom: this._config.zoom,
			mapTypeControlOptions: this._config.mapTypeControlOptions,
			center,
			scrollwheel: this._config.scrollwheel,
			styles: this._config.styles,
			disableDefaultUI: this._config.disableDefaultUI,
		});

		return Promise.resolve(center);
	}

	private async _pin (center: google.maps.LatLng) {
		const pins = this.detachedChildrenMap((el: HTMLElement) => new Pin(el, this));

		if (this._config.pin) {
			const centerEl = document.createElement('div');
			centerEl.setAttribute('lat', `${center.lat()}`);
			centerEl.setAttribute('lng', `${center.lng()}`);
			pins.unshift(new Pin(centerEl, this));
		}

		const markerBounds = new google.maps.LatLngBounds();

		let i = 1;
		for (const pin of pins) {
			await pin.markTo(this._gmap, i * 400);
			markerBounds.extend(pin.position);
			i++;
		}

		if (this._config.fitBounds) {
			this._gmap.fitBounds(markerBounds);
		}
	}
}

/**
 * 座標要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */
class Pin extends BaserElement<HTMLElement> {

	/**
	 *
	 * @version 1.0.0
	 * @since 0.6.0
	 */
	public position: google.maps.LatLng;

	/**
	 *
	 * @version 1.0.0
	 * @since 0.8.0
	 */
	private _map: GoogleMaps;

	/**
	 *
	 */
	private _ready: Promise<void>;

	/**
	 * コンストラクタ
	 *
	 * @version 1.0.0
	 * @since 0.0.6
	 * @param el 対象のDOM要素
	 * @param map GoogleMaps要素
	 *
	 */
	constructor (el: HTMLElement, map: GoogleMaps) {
		super(el);
		this._map = map;
		this._ready = this._init();
	}

	/**
	 * ピンをマップに立てる
	 *
	 * @version 1.0.0
	 * @since 0.0.6
	 * @param callback 位置情報が取得できた後に実行するコールバック
	 *
	 */
	public async markTo (map: google.maps.Map, delayTime: number) {
		return this._ready
			.then(Timer.delay<void>(delayTime))
			.then(this._markTo(map));
	}

	/**
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	private async _init () {
		const address = this.pullProp('address') as string;
		if (address) {
			this.position = await GoogleMaps.getLatLngByAddress(address);
		} else {
			const lat = this.pullProp('lat') as number;
			const lng = this.pullProp('lng') as number;
			this.position = new google.maps.LatLng(lat, lng);
		}
	}

	/**
	 * ピンをマップに立てる
	 *
	 * @version 1.0.0
	 * @since 0.0.6
	 *
	 */
	private _markTo (map: google.maps.Map) {
		return () => {
			const titleAttr = this.pullProp('title') as string;
			const heading = this.el.querySelector('h1,h2,h3,h4,h5,h6');
			const headingText = heading ? heading.textContent : '';
			const title = titleAttr || headingText || '';
			const iconURL = this.pullProp('icon') as string;
			const iconSize = this.pullProp('iconSize') as string;
			const href = this.pullProp('href') as string;
			const target = this.pullProp('target') === '_blank';
			const markerOption: google.maps.MarkerOptions = {
				position: this.position,
				title,
				animation: google.maps.Animation.DROP,
			};
			if (iconURL) {
				markerOption.icon = {
					url: iconURL,
				};
				if (iconSize) {
					const sizeQ: string[] = `${iconSize}`.split(/\s+/);
					const width = +sizeQ[0] || null;
					if (width != null) {
						const height: number = +sizeQ[1] || width;
						const size = new google.maps.Size(width, height);
						markerOption.icon.size = size;
						markerOption.icon.scaledSize = size;
					}
				}
			}
			const marker = new google.maps.Marker(markerOption);
			marker.setMap(map);

			if (href) {
				google.maps.event.addListener(marker, 'click', linkTo(href, target));
			} else if (this.el !== this._map.el) {
				google.maps.event.addListener(marker, 'click', this._openInfoWindow(map, marker));
			}
		};
	}

	/**
	 * インフォウィンドウを開く
	 *
	 * @version 1.0.0
	 * @since 0.8.0
	 *
	 */
	private _openInfoWindow (map: google.maps.Map, marker: google.maps.Marker) {
		return () => {
			const info = new google.maps.InfoWindow({disableAutoPan: true});
			info.setContent(this.el);
			info.open(map, marker);
			marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);

			// マップの中心を移動する
			const content = info.getContent();
			const proj = map.getProjection();
			const currentPoint = proj.fromLatLngToPoint(this.position);
			const scale = Math.pow(2, map.getZoom());
			const height = typeof content === 'string' ? 0 : content.getBoundingClientRect().height;
			const y = (currentPoint.y * scale - height) / scale;
			const newPoint = new google.maps.Point(currentPoint.x, y);
			const newPosition = proj.fromPointToLatLng(newPoint);
			map.panTo(newPosition);
		};
	}
}
