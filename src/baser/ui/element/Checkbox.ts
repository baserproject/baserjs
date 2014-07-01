module baser {

	export module ui {

		export module element {

			var CLASS_CHECKBOX: string = '-checkbox';

			/**
			 * チェックボックスの拡張クラス
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			export class Checkbox extends CheckableElement {

				/**
				 * コンストラクタ
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: CheckableElementOption) {

					super($el, options);

					this.$el.addClass(Form.className + CLASS_CHECKBOX);

					if (this.$label) {
						this.$label.addClass(Form.className + CLASS_CHECKBOX + '-label');
					}

				}

			}

		}

	}

}