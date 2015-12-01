import BaserElement = require('./BaserElement');
import FormElement = require('./FormElement');
import CheckableElement = require('./CheckableElement');
import ICheckbox = require('../Interface/ICheckbox');
import CheckableElementOption = require('../Interface/CheckableElementOption');

/**
 * チェックボックスの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
class Checkbox extends CheckableElement implements ICheckbox {

	/**
	 * Checkbox要素のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameCheckbox: string = 'form-checkbox';

	/**
	 * コンストラクタ
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 * @param el 管理するDOM要素
	 * @param options オプション
	 *
	 */
	constructor (el: HTMLInputElement, options: CheckableElementOption) {

		super(el, options);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		// IE6・7は反映させない
		if (!el.querySelector) {
			return;
		}

		this.addClass(Checkbox.classNameCheckbox);
		BaserElement.addClassTo(this.$label, Checkbox.classNameCheckbox, FormElement.classNameLabel);
		BaserElement.addClassTo(this.$wrapper, Checkbox.classNameCheckbox + '-' + FormElement.classNameWrapper);

	}

}

export = Checkbox;

