import BaserElement = require('./BaserElement');
import FormElement = require('./FormElement');
import Browser = require('./Browser');
import ISelect = require('../Interface/ISelect');
import SelectOption = require('../Interface/SelectOption');

/**
 * セレクトボックスの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
class Select extends FormElement implements ISelect {

	/**
	 * オプションのデフォルト値
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public static defaultOption: SelectOption = {
		useDefaultOptionList: Browser.spec.isTouchable && Browser.spec.ua.iPhone || Browser.spec.ua.iPod || Browser.spec.ua.android
	};

	/**
	 * Select要素のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameSelect: string = 'form-select';

	/**
	 * Select要素の擬似要素のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNamePseudoSelect: string = 'pseudo-select';

	/**
	 * Select要素の選択した値を表示する擬似要素のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNamePseudoSelectedDisplay: string = 'selected-display';

	/**
	 * Select要素のoption要素をのクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameSelectOptionList: string = 'option-list';

	/**
	 * Select要素のoption要素のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameSelectOption: string = 'item';

	/**
	 * iOSの場合に付加されるクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameOsIOs: string = 'os-i-os';

	/**
	 * Androidの場合に付加されるクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameOsAndroid: string = 'os-android';

	/**
	 * ブラウザデフォルトの選択リストを使用する場合に付加されるクラス
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public static classNameUseDefaultOptionList: string = 'use-default-option-list';

	/**
	 * Select要素の擬似option要素の選択時に付加されるクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameStateSelected: string = 'selected';

	/**
	 * Select要素の擬似option要素の選択がはずれた時に付加されるクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameStateUnselected: string = 'unselected';

	/**
	 * 管理するDOM要素
	 *
	 * @override
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public el: HTMLSelectElement;

	/**
	 * 初期の選択されているオプションのインデックス番号
	 *
	 * @since 0.4.0
	 *
	 */
	public defaultSelectedIndex: number;

	/**
	 * 選択されたオプションを表示する表示領域のjQueryオブジェクト
	 *
	 * @since 0.0.1
	 *
	 */
	public $selected: JQuery;

	/**
	 * デザイン適応要の擬似要素のjQueryオブジェクト
	 *
	 * @since 0.0.1
	 *
	 */
	public $pseudo: JQuery;

	/**
	 * オプション要素の擬似要素のjQueryコレクション
	 *
	 * @since 0.0.1
	 *
	 */
	public $options: JQuery;

	/**
	 * オプション情報
	 *
	 * @since 0.4.1
	 *
	 */
	protected _config: SelectOption;

	/**
	 * 現在選択されているインデックス
	 *
	 * @since 0.4.1
	 *
	 */
	private _currentIndex: number;

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
	constructor (el: HTMLSelectElement, options: SelectOption) {

		super(el, $.extend({}, Select.defaultOption, options));

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		// IE6・7は反映させない
		if (!el.querySelector) {
			return;
		}

		this._update();
	}

	/**
	 * クラス名を設定する
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 * @override
	 *
	 */
	protected _setClassName (): void {
		super._setClassName();
		// セレクトボックス用のクラス名を設定
		this.addClass(Select.classNameSelect);
	}

	/**
	 * ラップ要素を生成
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @override
	 *
	 */
	protected _createWrapper (): void {
		super._createWrapper();
		BaserElement.addClassTo(this.$wrapper, `${Select.classNameSelect}-${FormElement.classNameWrapper}`);
	}

	/**
	 * 擬似セレクトボックス要素を生成する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @override
	 *
	 */
	protected _createPsuedoElements (): void {
		this.$pseudo = $('<a />');
		this.$pseudo.attr('href', '#'); // href属性がないとフォーカスを当てることができない
		this.$pseudo.insertAfter(this.$el);
		BaserElement.addClassTo(this.$pseudo, FormElement.classNameFormElementCommon);
		BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect);

		this.$selected = $('<span />');
		this.$selected.appendTo(this.$pseudo);
		BaserElement.addClassTo(this.$selected, FormElement.classNameFormElementCommon);
		BaserElement.addClassTo(this.$selected, Select.classNamePseudoSelect, Select.classNamePseudoSelectedDisplay);

		if (!this._config.useDefaultOptionList) {
			this.$options = $('<ul />');
			this.$options.appendTo(this.$pseudo);
			BaserElement.addClassTo(this.$options, FormElement.classNameFormElementCommon);
			BaserElement.addClassTo(this.$options, Select.classNamePseudoSelect, Select.classNameSelectOptionList);
			this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
				const $opt: JQuery = $(opt);
				const value: string = $opt.val();
				const text: string = $opt.text();
				const $psuedoOpt: JQuery = $('<li />');
				$psuedoOpt.appendTo(this.$options);
				$psuedoOpt.data('value', value);
				$psuedoOpt.text(text);
				BaserElement.addClassTo($psuedoOpt, FormElement.classNameFormElementCommon);
				BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption);
			});
		}

		if (Browser.spec.isTouchable) {
			if (Browser.spec.ua.iPhone || Browser.spec.ua.iPod) {
				this.addClass(Select.classNameOsIOs);
				BaserElement.addClassTo(this.$wrapper, Select.classNameOsIOs);
				BaserElement.addClassTo(this.$label, Select.classNameOsIOs);
			} else if (Browser.spec.ua.android) {
				this.addClass(Select.classNameOsAndroid);
				BaserElement.addClassTo(this.$wrapper, Select.classNameOsAndroid);
				BaserElement.addClassTo(this.$label, Select.classNameOsAndroid);
			}
		}

		if (this._config.useDefaultOptionList) {
			this.addClass(Select.classNameUseDefaultOptionList);
			BaserElement.addClassTo(this.$wrapper, Select.classNameUseDefaultOptionList);
			BaserElement.addClassTo(this.$label, Select.classNameUseDefaultOptionList);
		}

	}

	/**
	 * イベントの登録
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @override
	 *
	 */
	protected _bindEvents (): void {
		super._bindEvents();

		// changeイベントが起こった場合に実行するルーチン
		this.$el.on('change.bcSelect', (): void => {
			this._update();
		});

		// 擬似option要素を選択した時に実行する
		this.$pseudo.on('click.bcSelect', 'li', (e: JQueryEventObject): void => {
			const $li: JQuery = $(e.target);
			const index: number = $li.index();
			this._onblur();
			this.setIndex(index);
			e.stopPropagation();
			e.preventDefault();
		});

		this.$pseudo.on('click.bcSelect', (e: JQueryEventObject): void => {
			e.preventDefault();
		});

		if (!this._config.useDefaultOptionList) {
			this._psuedoFocusEvent();
		} else {
			// href属性を削除することでフォーカスがあたらなくなる
			this.$pseudo.removeAttr('href');
		}

	}

	/**
	 * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	protected _onSilentChange (): void {
		this._update();
	}
	/**
	 * 要素の状態を更新する
	 *
	 * @version 0.8.0
	 * @since 0.0.1
	 * @return インスタンス自身
	 *
	 */
	public update (): Select {
		this._update();
		return this;
	}

	/**
	 * 値を設定する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @override
	 * @param value 設定したい値
	 *
	 */
	public setValue (value: string | number | boolean): void {
		const valueString: string = `${value}`;
		const $targetOption: JQuery = this.$el.find(`option[value="${valueString}"]`);
		if ($targetOption.length && !$targetOption.prop('selected')) {
			$targetOption.prop('selected', true);
			this._fireChangeEvent();
		}
	}

	/**
	 * インデックス番号から選択する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param index 対象のインデックス番号
	 * @param isSilent イベントを伝達しない
	 *
	 */
	public setIndex (index: number, isSilent: boolean = false): void {
		const $targetOption: JQuery = this.$el.find('option').eq(index);
		if ($targetOption.length && !$targetOption.prop('selected') && !$targetOption.prop('disabled')) {
			$targetOption.prop('selected', true);
			this._fireChangeEvent(isSilent);
		}
	}

	/**
	 * 現在の選択中のインデックス番号を取得する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @return インデックス番号
	 *
	 */
	public getIndex (): number {
		let currentIndex: number = 0;
		this.$el.find('option').each( (i: number, el: HTMLElement): void => {
			const $opt: JQuery = $(el);
			if ($opt.prop('selected')) {
				currentIndex = $opt.index();
			}
		});
		return currentIndex;
	}

	/**
	 * 次の項目を選択する
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param isSilent イベントを伝達しない
	 *
	 */
	public next (isSilent: boolean): void {
		const currentIndex: number = this.getIndex();
		const max: number = this.$el.find('option').length;
		const nextIndex: number = currentIndex + 1;
		this.setIndex(Math.min(nextIndex, max), isSilent);
	}

	/**
	 * 前の項目を選択する
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param isSilent イベントを伝達しない
	 *
	 */
	public prev (isSilent: boolean): void {
		const currentIndex: number = this.getIndex();
		const prevIndex: number = currentIndex - 1;
		this.setIndex(Math.max(prevIndex, 0), isSilent);
	}

	/**
	 * 無効状態を設定する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.1
	 * @override
	 *
	 */
	public setDisabled (isDisabled: boolean): void {
		super.setDisabled(isDisabled);
		if (this.disabled) {
			this.$pseudo.attr('tabindex', -1);
		} else {
			this.$pseudo.removeAttr('tabindex');
		}
	}

	/**
	 * フォーカスがあたった時の処理
	 *
	 * use: jQuery
	 *
	 * @version 0.4.1
	 * @since 0.0.1
	 * @override
	 *
	 */
	protected _onfocus (): void {
		if (!this.hasFocus) {
			// 全体のフォーカスを外す
			$(document).triggerHandler('click.bcSelect');
			// 親クラスのフォーカスを実行
			super._onfocus();
			// DOMのclassを制御
			BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
			BaserElement.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
			// スクロール位置を調整する
			this._scrollToSelectedPosition();
			// 一覧を開いた時のインデックス番号を記録する
			this._currentIndex = this.getIndex();
		}
	}

	/**
	 * フォーカスがはずれた時の処理
	 *
	 * use: jQuery
	 *
	 * @version 0.1.0
	 * @since 0.0.1
	 *
	 */
	protected _onblur (): void {
		// 一旦 コンストラクタのsuper()の中で_onblur()が$pseudoプロパティを作成する前に呼び出されるため
		if (this.$pseudo) {
			super._onblur();
			BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
			BaserElement.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
		}
	}

	/**
	 * 要素の状態を更新する
	 *
	 * use: jQuery
	 *
	 * FIXME: 要素が足りない場合の考慮が不足している気がする
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	private _update (): void {

		let $psuedoOptList: JQuery;
		if (this.$options) {
			$psuedoOptList = this.$options.find('li');
		}

		this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
			const $opt: JQuery = $(opt);
			const isSelected: boolean = <boolean> $opt.prop('selected');
			if (isSelected) {
				this.$selected.text($opt.text());
			}
			if (this.$options) {
				const isDisabled: boolean = <boolean> $opt.prop('disabled');
				const $psuedoOpt: JQuery = $psuedoOptList.eq(i);
				$psuedoOpt.attr('aria-selected', `${isSelected}`);
				$psuedoOpt.attr('aria-disabled', `${isDisabled}`);
				if (isSelected) {
					BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
					BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
				} else {
					BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
					BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
				}
				if (isDisabled) {
					BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
				} else {
					BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
				}
			}
		});

	}

	/**
	 * スクロール位置を調整する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.1.0
	 *
	 */
	private _scrollToSelectedPosition (): void {
		if (this.$options) {
			let $selectedPsuedoOpt: JQuery;
			const $psuedoOptList: JQuery = this.$options.find('li');
			this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
				const $opt: JQuery = $(opt);
				const isSelected: boolean = <boolean> $opt.prop('selected');
				if (isSelected) {
					$selectedPsuedoOpt = $psuedoOptList.eq(i);
				}
			});
			// ポジションを正しく取得するために一度スクロール位置をリセットする
			this.$options.scrollTop(0);
			const optPos: JQueryCoordinates = $selectedPsuedoOpt.offset();
			const cntPos: JQueryCoordinates = this.$options.offset();
			if (optPos && cntPos) {
				this.$options.scrollTop(optPos.top - cntPos.top);
			}
		}
	}

	/**
	 * 擬似要素にフォーカスがあったった時のイベントと伝達を制御する
	 *
	 * use: jQuery
	 *
	 * @version 0.4.0
	 * @since 0.0.1
	 *
	 */
	private _psuedoFocusEvent (): void {

		this.$el.off('focus.bcFormElement');
		this.$el.off('blur.bcFormElement');

		// セレクトボックス本体にフォーカスがあたったら、
		// 擬似要素のほうへフォーカスを即座に移動させる
		this.$el.on('focus.bcSelect', (e: JQueryEventObject): void => {
			if (!this.disabled) {
				this.$pseudo.focus();
			}
			e.stopPropagation();
			e.preventDefault();
		});

		// ドキュメントのどこかをフォーカスorクリックしたらフォーカスがはずれる
		// ※_onfocus()からも呼び出される
		$(document).on('click.bcSelect', (e: JQueryEventObject): void => {
			this._onblur();
		});
		// documentへ伝達するフォーカスは focusin イベント
		$(document).on('focusin', (e: JQueryEventObject): void => {
			this._onblur();
		});

		// 擬似セレクトボックスにフォーカスorクリックが起こった時に発火する
		this.$pseudo
			.on('focus.bcSelect', (e: JQueryEventObject): void => {
				if (!this.disabled) {
					this._onfocus();
				} else {
					this.$pseudo.blur();
				}
				// ドキュメントに伝達しない
				e.stopPropagation();
			})
			.on('click.bcSelect', (e: JQueryEventObject): void => {
				if (!this.disabled) {
					this._onfocus();
				}
				// ドキュメントに伝達しない
				e.stopPropagation();
				// href="#"なのでデフォルトイベントを抑制
				e.preventDefault();
			});

		// ドキュメントへのフォーカスorクリック伝達を抑制
		this.$label.on('click.bcSelect focus.bcSelect', (e: JQueryEventObject): void => {
			// ドキュメントに伝達しない
			e.stopPropagation();
		});

		this._bindKeybordEvent();

	}

	/**
	 * フォーカス時のキーボードイベント
	 *
	 * use: jQuery
	 *
	 * TODO: KeyCodeの数値をマジックナンバーにせずに定数から参照するようにする
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _bindKeybordEvent (): void {
		$(document).on('keydown', (e: JQueryKeyEventObject): void => {
			if (this.hasFocus) {
				switch (e.keyCode) {
					case 38: {
						// keyUp
						this.prev(true);
						this._scrollToSelectedPosition();
						e.preventDefault();
					}
					break;
					case 40: {
						// keyDown
						this.next(true);
						this._scrollToSelectedPosition();
						e.preventDefault();
					}
					break;
					case 13: {
						// Return (Enter)
						if (this._currentIndex !== this.getIndex()) {
							this._fireChangeEvent();
						}
						this._onblur();
						e.preventDefault();
					}
					break;
					default: {
						// void
					}
				}
			}
		});
	}


}

export = Select;
