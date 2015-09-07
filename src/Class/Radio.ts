import BaserElement = require('./BaserElement');
import FormElement = require('./FormElement');
import CheckableElement = require('./CheckableElement');
import RadioGroup = require('./RadioGroup');
import IRadio = require('../Interface/IRadio');
import CheckableElementOption = require('../Interface/CheckableElementOption');

/**
 * ラジオボタンの拡張クラス
 *
 * @version 0.1.0
 * @since 0.0.1
 *
 */
class Radio extends CheckableElement implements IRadio {

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
	 * @version 0.9.0
	 * @since 0.0.1
	 * @param el 管理するDOM要素
	 * @param options オプション
	 *
	 */
	constructor (el: HTMLElement, options: CheckableElementOption) {

		super(el, options);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		// IE6・7は反映させない
		if (!el.querySelector) {
			return;
		}

		this.addClass(Radio.classNameRadio);
		BaserElement.addClassTo(this.$label, Radio.classNameRadio, FormElement.classNameLabel);
		BaserElement.addClassTo(this.$wrapper, Radio.classNameRadio + '-' + FormElement.classNameWrapper);

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

export = Radio;
