module baser {

	export module ui {

		export module element {

			var CLASS_RADIO: string = '-radio';

			/**
			 * ラジオボタンの拡張クラス
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			export class Radio extends CheckableElement {

				/**
				 * コンストラクタ
				 *
				 * @version 0.0.4
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: CheckableElementOption) {

					super($el, options);

					this.$el.addClass(Form.className + CLASS_RADIO);
					this.$wrapper.addClass(Form.className + CLASS_RADIO + '-wrapper');
					this.$label.addClass(Form.className + CLASS_RADIO + '-label');

					// ラジオボタングループに登録
					if (!Form.radioGroups[this.name]) {
						Form.radioGroups[this.name] = new RadioGroup(this.name);
					}
					Form.radioGroups[this.name].add(this);

				}

				/**
				 * チェンジイベントのハンドラ
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 *
				 */
				public _onchenge () {

					super._onchenge();

					Form.radioGroups[this.name].update(this);

				}

			}

		}

	}

}