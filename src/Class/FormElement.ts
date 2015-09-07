import BaserElement = require('./BaserElement');
import IFormElement = require('../Interface/IFormElement');
import FormElementOption = require('../Interface/FormElementOption');

/**
 * フォーム要素の抽象クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
class FormElement extends BaserElement implements IFormElement {

	/**
	 * オプションのデフォルト値
	 *
	 * @version 0.0.5
	 * @since 0.0.1
	 *
	 */
	static defaultOption: FormElementOption = {
		label: '',
		labelTag: 'label',
		labelClass: '',
		autoLabeling: true
	};

	/**
	 * FormElement関連の要素の共通のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameFormElementCommon: string = 'form-element';

	/**
	 * FormElement関連のラッパー要素の共通のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameWrapper: string = 'wrapper';

	/**
	 * FormElement関連のラベル要素の共通のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameLabel: string = 'label';

	/**
	 * FormElement関連の要素のフォーカス時に付加されるクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameStateFocus: string = 'focus';

	/**
	 * FormElement関連の要素のフォーカスがはずれた時に付加されるクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameStateBlur: string = 'blur';

	/**
	 * FormElement関連の要素の無効状態の時に付加されるクラス
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	static classNameStateDisabled: string = 'disabled';

	/**
	 * フォーム関連要素リスト
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static elements: FormElement[] = [];
	
	/**
	 * 管理するDOM要素
	 *
	 * @override
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

	/**
	 * ラベルのテキスト
	 *
	 * @since 0.0.1
	 *
	 */
	public label: string;

	/**
	 * 前にあるラベルのテキスト
	 *
	 * @since 0.4.0
	 *
	 */
	public labelBeforeText: string;

	/**
	 * 後ろにあるラベルのテキスト
	 *
	 * @since 0.4.0
	 *
	 */
	public labelAfterText: string;

	/**
	 * フォーカスがあたっている状態かどうか
	 *
	 * @since 0.1.0
	 *
	 */
	public hasFocus: boolean = false;

	/**
	 * 無効状態
	 *
	 * @since 0.4.0
	 *
	 */
	public disabled: boolean;

	/**
	 * 初期の値
	 *
	 * @since 0.4.0
	 *
	 */
	public defaultValue: string;

	/**
	 * ラベル要素にラップされているかどうか
	 *
	 * @since 0.0.4
	 *
	 */
	public isWrappedByLabel: boolean;

	/**
	 * for属性に基づくラベル要素に属しているかどうか
	 *
	 * @since 0.5.1
	 *
	 */
	public hasLabelByForAttr: boolean;

	/**
	 * ラベル要素のjQueryオブジェクト
	 *
	 * @since 0.0.1
	 *
	 */
	public $label: JQuery;

	/**
	 * ラッパー要素のjQueryオブジェクト
	 *
	 * @since 0.0.4
	 *
	 */
	public $wrapper: JQuery;

	/**
	 * オプション情報
	 *
	 * @since 0.4.1
	 *
	 */
	protected _config: FormElementOption;

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
	constructor (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, options: FormElementOption) {

		super(el);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		// IE6・7は反映させない
		if (!el.querySelector) {
			return;
		}

		this._config = $.extend({}, FormElement.defaultOption, options);

		// クラス名を設定す
		this._setClassName();

		// ラベル要素の割り当て
		this._asignLabel();

		// ラベルテキストの設定
		this._setLabelText();

		// ラップ要素の割り当て
		this._createWrapper();

		// 擬似要素生成
		this._createPsuedoElements();

		// イベントを登録
		this._bindEvents();

		// 初期状態を設定
		this.defaultValue = this.$el.val();
		this.setDisabled(<boolean> this.$el.prop('disabled'));
		this._onblur();

		// フォーム要素に登録
		// TODO: 有要な処理か検討
		FormElement.elements.push(this);

	}

	/**
	 * クラス名を設定する
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	protected _setClassName (): void {
		// 共通のクラスを付加
		this.addClass(FormElement.classNameFormElementCommon);
	}


	/**
	 * ラベル要素内のテキストを取得する
	 * 
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	private _setLabelText (): void {

		if (this._config.label) {

			this.$label.prepend(this._config.label);
			this.labelBeforeText = this._config.label;
			this.labelAfterText = '';

		} else {

			let $labelContents: JQuery = this.$label.contents();
			let $before: JQuery = $();
			let $after: JQuery = $();
			let isBefore: boolean = true;

			$labelContents.each( (i: number, node: Node): void => {
				if (node === this.$el[0]) {
					isBefore = false;
					return;
				}
				if (isBefore) {
					$before = $before.add($(node));
				} else {
					$after = $after.add($(node));
				}
			});

			$before.text( (i: number, text: string): string => {
				return $.trim(text);
			});

			$after.text( (i: number, text: string): string => {
				return $.trim(text);
			});

			this.labelBeforeText = $before.text() || this.$el.attr('title') || '';
			this.labelAfterText = $after.text() || '';

			if (this.labelBeforeText) {
				this.$label.prepend($before);
			}

			if (this.labelAfterText) {
				this.$label.append($after);
			}

		}

		this.label = this.labelBeforeText + this.labelAfterText;

	}

	/**
	 * ラベル要素を割り当てる
	 * 
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	private _asignLabel (): void {

		this.hasLabelByForAttr = false;

		// 祖先のlabel要素を検索
		let $label: JQuery = this.$el.closest('label');

		// label要素の存在
		let hasLabel: boolean = !!$label.length;

		// labelでネストされていたかどうか
		this.isWrappedByLabel = hasLabel;

		// for属性に関連づいたlabel要素を取得
		if (!hasLabel) {
			$label = $(`label[for="${this.id}"]`);
			hasLabel = !!$label.length;
			this.hasLabelByForAttr = hasLabel;
		}

		// ラベルがないときにラベル要素を生成する
		if (this._config.autoLabeling && !hasLabel) {
			// label(もしくは別の)要素の生成
			$label = $(`<${this._config.labelTag.toLowerCase()} />`);
			$label.insertAfter(this.$el);
			if (this._config.labelClass) {
				$label.addClass(this._config.labelClass);
			}
			if (this._config.labelTag.toLowerCase() === 'label') {
				// labelを生成したのならfor属性にidを紐付ける
				$label.attr('for', this.id);
			}
		}

		// console.log({
		// 	hasLabel: hasLabel,
		// 	isWrappedByLabel: this.isWrappedByLabel,
		// 	hasLabelByForAttr: this.hasLabelByForAttr
		// });

		BaserElement.addClassTo($label, FormElement.classNameFormElementCommon);
		BaserElement.addClassTo($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);

		this.$label = $label;

	}

	/**
	 * ラップ要素を生成
	 * 
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	protected _createWrapper (): void {
		let wrapperHtml: string = '<span />';
		let $wrapper = $(wrapperHtml);

		BaserElement.addClassTo($wrapper, FormElement.classNameFormElementCommon);
		BaserElement.addClassTo($wrapper, FormElement.classNameWrapper);

		if (this.isWrappedByLabel) {
			this.$label.wrapAll($wrapper);
			this.$wrapper = this.$label.parent('span');
		} else if (this.hasLabelByForAttr) {
			this.$el.wrapAll($wrapper);
			this.$wrapper = this.$el.parent('span');
		} else {
			this.$el.add(this.$label).wrapAll($wrapper);
			this.$wrapper = this.$el.parent('span');
		}
	}

	/**
	 * 擬似要素を生成する
	 *
	 * @version 0.4.1
	 * @since 0.4.0
	 *
	 */
	protected _createPsuedoElements (): void {
		// void
	}

	/**
	 * イベントの登録
	 * 
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	protected _bindEvents (): void {
		this.$el.on('focus.bcFormElement', (): void => {
			if (!this.disabled) {
				this._onfocus();
			}
		});
		this.$el.on('blur.bcFormElement', (): void => {
			this._onblur();
		});
		this.$el.on('change.bcFormElement', (e: JQueryEventObject, arg: any): void => {
			if (arg && arg.isSilent) {
				this._onSilentChange();
			} else {
				this.trigger('change', null, this);
			}
		});
	}

	/**
	 * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	protected _onSilentChange (): void {
		// void
	}

	/**
	 * フォーカスがあたった時の処理
	 *
	 * use: jQuery
	 * 
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	protected _onfocus (): void {
		this.hasFocus = true;
		BaserElement.addClass(
			this.el,
			FormElement.classNameFormElementCommon,
			'',
			FormElement.classNameStateFocus);
		BaserElement.addClassTo(
			this.$label,
			FormElement.classNameFormElementCommon,
			FormElement.classNameLabel,
			FormElement.classNameStateFocus);
		BaserElement.addClassTo(
			this.$wrapper,
			FormElement.classNameWrapper,
			'',
			FormElement.classNameStateFocus);
		BaserElement.removeClass(
			this.el,
			FormElement.classNameFormElementCommon,
			'',
			FormElement.classNameStateBlur);
		BaserElement.removeClassFrom(
			this.$label,
			FormElement.classNameFormElementCommon,
			FormElement.classNameLabel,
			FormElement.classNameStateBlur);
		BaserElement.removeClassFrom(
			this.$wrapper,
			FormElement.classNameWrapper,
			'',
			FormElement.classNameStateBlur);
	}

	/**
	 * フォーカスがはずれた時の処理
	 *
	 * use: jQuery
	 * 
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	protected _onblur (): void {
		this.hasFocus = false;
		BaserElement.addClass(
			this.el,
			FormElement.classNameFormElementCommon,
			'',
			FormElement.classNameStateBlur);
		BaserElement.addClassTo(
			this.$label,
			FormElement.classNameFormElementCommon,
			FormElement.classNameLabel,
			FormElement.classNameStateBlur);
		BaserElement.addClassTo(
			this.$wrapper,
			FormElement.classNameWrapper,
			'',
			FormElement.classNameStateBlur);
		BaserElement.removeClass(
			this.el,
			FormElement.classNameFormElementCommon,
			'',
			FormElement.classNameStateFocus);
		BaserElement.removeClassFrom(
			this.$label,
			FormElement.classNameFormElementCommon,
			FormElement.classNameLabel,
			FormElement.classNameStateFocus);
		BaserElement.removeClassFrom(
			this.$wrapper,
			FormElement.classNameWrapper,
			'',
			FormElement.classNameStateFocus);
	}

	/**
	 * changeイベントを発火する
	 * 
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param isSilent イベントを伝達しない
	 *
	 */
	protected _fireChangeEvent (isSilent: boolean = false): void {
		if (isSilent) {
			this.$el.trigger('change.bcFormElement', [{ isSilent: <boolean> true }]);
		} else if ('createEvent' in document) {
			let e: Event = document.createEvent('Event');
			e.initEvent('change', true, true);
			this.el.dispatchEvent(e);
		} else {
			// IE8
			let legacyElement: any = this.el;
			legacyElement.fireEvent('onchange');
		}
	}

	/**
	 * 値を設定する
	 * 
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param value 設定する値
	 * @param isSilent イベントを伝達しない
	 *
	 */
	public setValue (value: string | number | boolean, isSilent: boolean = false): void {
		let valueString: string = '' + value;
		let currentValue: string = this.$el.val();
		if (!this.disabled && currentValue !== valueString) {
			this.$el.val(valueString);
			this._fireChangeEvent(isSilent);
		}
	}

	/**
	 * 無効状態を設定する
	 * 
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param 無効状態かどうか
	 *
	 */
	public setDisabled (isDisabled: boolean): void {
		this.disabled = isDisabled;
		this.el.disabled = isDisabled;
		if (this.disabled) {
			BaserElement.addClass(
				this.el,
				FormElement.classNameFormElementCommon,
				'',
				FormElement.classNameStateDisabled);
			BaserElement.addClassTo(
				this.$label,
				FormElement.classNameFormElementCommon,
				FormElement.classNameLabel,
				FormElement.classNameStateDisabled);
			BaserElement.addClassTo(
				this.$wrapper,
				FormElement.classNameWrapper,
				'',
				FormElement.classNameStateDisabled);
		} else {
			BaserElement.removeClass(
				this.el,
				FormElement.classNameFormElementCommon,
				'',
				FormElement.classNameStateDisabled);
			BaserElement.removeClassFrom(
				this.$label,
				FormElement.classNameFormElementCommon,
				FormElement.classNameLabel,
				FormElement.classNameStateDisabled);
			BaserElement.removeClassFrom(
				this.$wrapper,
				FormElement.classNameWrapper,
				'',
				FormElement.classNameStateDisabled);
		}
	}

}

export = FormElement;
