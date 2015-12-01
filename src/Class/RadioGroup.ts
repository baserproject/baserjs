import Radio = require('./Radio');

/**
 * ラジオボタンのname属性値で紐付いたブループを管理するクラス
 *
 * @since 0.9.0
 *
 */
class RadioGroup {

	/**
	 * ラジオボタンのグループを保管するオブジェクト
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	public static groups: { [name: string]: RadioGroup } = {};

	/**
	 * 紐づくname属性値
	 *
	 * @since 0.0.1
	 *
	 */
	public name: string;

	/**
	 * ラジオボタンのリスト
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	private _radioButtons: Radio[] = [];

	/**
	 * コンストラクタ
	 *
	 * @since 0.0.1
	 * @param name 紐づくname属性値
	 *
	 */
	constructor (name: string) {
		this.name = name;
	}

	/**
	 * 紐づくラジオボタンを追加する
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 * @param radio 拡張ラジオボタン
	 *
	 */
	public add (radio: Radio): void {
		for (const radioButton of this._radioButtons) {
			if (radioButton === radio) {
				return;
			}
		}
		this._radioButtons.push(radio);
	}

	/**
	 * 管理するラジオボタンの状態を更新する
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 * @param ignoreRadio 対象外のラジオボタン
	 *
	 */
	public update (ignoreRadio: Radio): void {
		for (const radioButton of this._radioButtons) {
			if (radioButton !== ignoreRadio) {
				radioButton.update();
			}
		}
	}

}

export = RadioGroup;
