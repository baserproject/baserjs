module baser.ui.element {

	/**
	 * チェックボックスの拡張クラス
	 *
	 * @version 0.1.0
	 * @since 0.0.1
	 *
	 */
	export class Checkbox extends CheckableElement {

		/**
		 * Checkbox要素のクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameCheckbox: string = 'form-checkbox';

		/**
		 * コンストラクタ
		 *
		 * @version 0.4.1
		 * @since 0.0.1
		 * @param $el 管理するDOM要素のjQueryオブジェクト
		 * @param options オプション
		 *
		 */
		constructor ($el: JQuery, options: CheckableElementOption) {

			super($el, options);

			// IE6・7は反映させない
			if (!$el[0].querySelector) {
				return;
			}

			this.addClass(Checkbox.classNameCheckbox);
			Element.addClassTo(this.$label, Checkbox.classNameCheckbox, FormElement.classNameLabel);
			Element.addClassTo(this.$wrapper, Checkbox.classNameCheckbox + '-' + FormElement.classNameWrapper);

		}

	}

}

