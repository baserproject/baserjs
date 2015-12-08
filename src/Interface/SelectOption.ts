import FormElementOption = require('./FormElementOption');

/**
 * Selectクラスのオプションハッシュのインターフェイス
 *
 * @version 0.4.0
 * @since 0.4.0
 *
 */
interface SelectOption extends FormElementOption {

	/**
	 * 選択リストをブラウザデフォルトのものにするかどうか
	 *
	 * @since 0.4.0
	 *
	 */
	useDefaultOptionList?: boolean;

}

export = SelectOption;
