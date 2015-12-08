import FormElementOption = require('./FormElementOption');

/**
 * CheckableElementクラスのオプションハッシュのインターフェイス
 *
 * @version 0.0.2
 * @since 0.0.1
 *
 */
interface CheckableElementOption extends FormElementOption {

	/**
	 * チェック状態の時に付加されるclass属性値
	 *
	 * @since 0.0.1
	 *
	 */
	checkedClass?: string;

}

export = CheckableElementOption;
