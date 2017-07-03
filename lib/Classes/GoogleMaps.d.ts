import BaserElement from './BaserElement';
/**
 * マップ要素
 *
 * @version 1.0.0
 * @since 0.0.6
 *
 */
export default class GoogleMaps extends BaserElement<HTMLDivElement, GoogleMapsConfig> {
    /**
     * 住所文字列から座標を非同期で取得
     *
     * @version 1.0.0
     * @since 0.2.0
     *
     */
    static getLatLngByAddress(address: string): Promise<google.maps.LatLng>;
    /**
     * data-{*}-state属性のキー
     */
    protected stateKeyName: string;
    /**
     * Google Mapsのインスタンス
     *
     * @version 1.0.0
     * @since 0.0.6
     *
     */
    private _gmap;
    protected _create(): Promise<void>;
    /**
     * 初期化
     *
     * @version 1.0.0
     * @since 0.0.6
     *
     */
    private _init();
    /**
     * レンダリング
     *
     * @version 1.0.0
     * @since 0.2.0
     * @param lat 緯度
     * @param lng 経度
     *
     */
    private _render(center);
    private _pin(center);
}
export declare type GoogleMapsInviewAction = 'render' | 'pin';
/**
 * GoogleMapsクラスのオプションハッシュのインターフェイス
 *
 * @version 0.6.0
 * @since 0.0.9
 *
 */
export interface GoogleMapsConfig {
    /**
     * 緯度
     *
     * 数値でない場合は`TypeError`の例外を投げる。
     */
    lat: number | null;
    /**
     * 経度
     *
     * 数値でない場合は`TypeError`の例外を投げる。
     */
    lng: number | null;
    /**
     * 住所
     *
     * Geocoder APIを利用するので検索結果が失敗する可能性がある。
     * `lat`と`lng`がある場合は無視される。
     */
    address: string | null;
    /**
     * ズーム率
     *
     * `fitBounds`が`true`の場合は無視されます。
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     */
    zoom: number;
    /**
     * マップのコントロールオプション
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     */
    mapTypeControlOptions: google.maps.MapTypeControlOptions;
    /**
     * スクロールホイールが有効かどうか
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     */
    scrollwheel: boolean;
    /**
     * 地図のスタイル
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     */
    styles: google.maps.MapTypeStyle[];
    /**
     *
     */
    disableDefaultUI: boolean;
    /**
     * 複数ピンを置いたときに地図内に収まるように
     * ズームと中心を調整するかどうか
     *
     * @version 0.6.0
     * @since 0.6.0
     *
     */
    fitBounds: boolean;
    /**
     * ピンを刺すかどうか
     */
    pin: boolean;
    /**
     *
     */
    scrollSpy: GoogleMapsInviewAction | null;
    /**
     * ピンを指すタイミングの遅延時間
     */
    pinningDelayTime: number;
}
