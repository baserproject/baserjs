module baser.ui.element {

	/**
	 * ラジオボタンの拡張クラス
	 *
	 * @version 0.1.0
	 * @since 0.0.1
	 *
	 */
	export class Radio extends CheckableElement implements IRadio {

		/**
		 * Radio要素のクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameRadio: string = 'form-radio';

		/**
		 * コンストラクタ
		 *
		 * @version 0.7.0
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

			this.addClass(Radio.classNameRadio);
			Element.addClassTo(this.$label, Radio.classNameRadio, FormElement.classNameLabel);
			Element.addClassTo(this.$wrapper, Radio.classNameRadio + '-' + FormElement.classNameWrapper);

			// ラジオボタングループに登録
			if (!RadioGroup.groups[this.name]) {
				RadioGroup.groups[this.name] = new RadioGroup(this.name);
			}
			RadioGroup.groups[this.name].add(this);

		}

		/**
		 * チェンジイベントのハンドラ
		 *
		 * @version 0.7.0
		 * @since 0.0.1
		 *
		 */
		public _onchenge () {

			super._onchenge();

			// 同じname属性のラジオボタン要素も同時に変更をする
			RadioGroup.groups[this.name].update(this);

		}

	}

}
