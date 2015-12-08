/**
 * GoogleMapsクラスのオプションハッシュのインターフェイス
 *
 * @version 0.6.0
 * @since 0.0.9
 *
 */
interface GoogleMapsOption {

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

	/**
	 * 複数ピンを置いたときに地図内に収まるように
	 * ズームと中心を調整するかどうか
	 *
	 * @version 0.6.0
	 * @since 0.6.0
	 *
	 */
	fitBounds?: boolean;

}

export = GoogleMapsOption;
