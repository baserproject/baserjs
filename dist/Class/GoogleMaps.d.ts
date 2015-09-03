import BaserElement = require('./BaserElement');
import GoogleMapsOption = require('../Interface/GoogleMapsOption');
/**
 * マップ要素
 *
 * @version 0.8.0
 * @since 0.0.6
 *
 */
declare class GoogleMaps extends BaserElement {
    /**
     * 初期設定用の緯度
     * 東京都庁
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    static defaultLat: number;
    /**
     * 初期設定用の経度
     * 東京都庁
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    static defaultLng: number;
    /**
     * 緯度
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    lat: number;
    /**
     * 経度
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    lng: number;
    /**
     * 管理対象の要素に付加するclass属性値のプレフィックス
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    static className: string;
    /**
     * 管理するマップ要素リスト
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    static maps: GoogleMaps[];
    /**
     * Google Mapsのインスタンス
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    gmap: google.maps.Map;
    /**
     * インフォウィンドウ
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    info: google.maps.InfoWindow;
    /**
     * ピンを置いた座標の要素
     *
     * @version 0.0.6
     * @since 0.0.6
     *
     */
    $coordinates: JQuery;
    /**
     * マップオプション
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     */
    mapOption: GoogleMapsOption;
    /**
     * バウンズオブジェクト
     *
     * @version 0.6.0
     * @since 0.6.0
     *
     */
    markerBounds: google.maps.LatLngBounds;
    /**
     * コンストラクタ
     *
     * @version 0.8.0
     * @since 0.0.6
     * @param $el 管理するDOM要素のjQueryオブジェクト
     * @param options マップオプション
     *
     */
    constructor($el: JQuery, options?: GoogleMapsOption);
    /**
     * 初期化
     *
     * @version 0.6.0
     * @since 0.0.6
     *
     */
    private _init();
    /**
     * レンダリング
     *
     * @version 0.8.0
     * @since 0.2.0
     * @param mapCenterLat 緯度
     * @param mapCenterLng 経度
     *
     */
    private _render(mapCenterLat, mapCenterLng);
    /**
     * 再読み込み・再設定
     *
     * @version 0.6.0
     * @since 0.2.0
     *
     */
    reload(options?: GoogleMapsOption): void;
    /**
     * 住所文字列から座標を非同期で取得
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    static getLatLngByAddress(address: string, callback: (lat: number, lng: number) => void): void;
}
export = GoogleMaps;
