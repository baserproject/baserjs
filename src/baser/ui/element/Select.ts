module baser.ui.element {

	/**
	 * Selectクラスのオプションハッシュのインターフェイス
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	export interface SelectOption extends FormElementOption {

		/**
		 * 選択リストをブラウザデフォルトのものにするかどうか
		 *
		 * @since 0.4.0
		 *
		 */
		useDefaultOptionList?: boolean;

	}

	/**
	 * セレクトボックスの拡張クラス
	 *
	 * @version 0.1.0
	 * @since 0.0.1
	 *
	 */
	export class Select extends FormElement implements ISelect {

		/**
		 * オプションのデフォルト値
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		static defaultOption: SelectOption = {
			useDefaultOptionList: Browser.spec.isTouchable && Browser.spec.ua.iPhone || Browser.spec.ua.iPod || Browser.spec.ua.android
		};

		/**
		 * Select要素のクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameSelect: string = 'form-select';

		/**
		 * Select要素の擬似要素のクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNamePseudoSelect: string = 'pseudo-select';

		/**
		 * Select要素の選択した値を表示する擬似要素のクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNamePseudoSelectedDisplay: string = 'selected-display';

		/**
		 * Select要素のoption要素をのクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameSelectOptionList: string = 'option-list';

		/**
		 * Select要素のoption要素のクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameSelectOption: string = 'item';

		/**
		 * iOSの場合に付加されるクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameOsIOs: string = 'os-i-os';

		/**
		 * Androidの場合に付加されるクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameOsAndroid: string = 'os-android';

		/**
		 * ブラウザデフォルトの選択リストを使用する場合に付加されるクラス
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		static classNameUseDefaultOptionList: string = 'use-default-option-list';

		/**
		 * Select要素の擬似option要素の選択時に付加されるクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameStateSelected: string = 'selected';

		/**
		 * Select要素の擬似option要素の選択がはずれた時に付加されるクラス
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		static classNameStateUnselected: string = 'unselected';

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
		 * @version 0.4.1
		 * @since 0.0.1
		 * @param $el 管理するDOM要素のjQueryオブジェクト
		 * @param options オプション
		 *
		 */
		constructor ($el: JQuery, options: SelectOption) {

			super($el, $.extend({}, Select.defaultOption, options));

			// IE6・7は反映させない
			if (!$el[0].querySelector) {
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
		 * @version 0.4.0
		 * @since 0.4.0
		 * @override
		 *
		 */
		protected _createWrapper (): void {
			super._createWrapper();
			Element.addClassTo(this.$wrapper, Select.classNameSelect + '-' + FormElement.classNameWrapper);
		}

		/**
		 * 擬似セレクトボックス要素を生成する
		 *
		 * @version 0.4.1
		 * @since 0.4.0
		 * @override
		 *
		 */
		protected _createPsuedoElements (): void {
			this.$pseudo = $('<a />');
			this.$pseudo.attr('href', '#'); // Focusable
			this.$pseudo.insertAfter(this.$el);
			Element.addClassTo(this.$pseudo, FormElement.classNameFormElementCommon);
			Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect);

			this.$selected = $('<span />');
			this.$selected.appendTo(this.$pseudo);
			Element.addClassTo(this.$selected, FormElement.classNameFormElementCommon);
			Element.addClassTo(this.$selected, Select.classNamePseudoSelect, Select.classNamePseudoSelectedDisplay);

			if (!this._config.useDefaultOptionList) {
				this.$options = $('<ul />');
				this.$options.appendTo(this.$pseudo);
				Element.addClassTo(this.$options, FormElement.classNameFormElementCommon);
				Element.addClassTo(this.$options, Select.classNamePseudoSelect, Select.classNameSelectOptionList);
				this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
					var $opt: JQuery = $(opt);
					var value: string = $opt.val();
					var text: string = $opt.text();
					var $psuedoOpt: JQuery = $('<li />');
					$psuedoOpt.appendTo(this.$options);
					$psuedoOpt.data('value', value);
					$psuedoOpt.text(text);
					Element.addClassTo($psuedoOpt, FormElement.classNameFormElementCommon);
					Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption);
				});
			}

			if (Browser.spec.isTouchable) {
				if (Browser.spec.ua.iPhone || Browser.spec.ua.iPod) {
					this.addClass(Select.classNameOsIOs);
					Element.addClassTo(this.$wrapper, Select.classNameOsIOs);
					Element.addClassTo(this.$label, Select.classNameOsIOs);
				} else if (Browser.spec.ua.android) {
					this.addClass(Select.classNameOsAndroid);
					Element.addClassTo(this.$wrapper, Select.classNameOsAndroid);
					Element.addClassTo(this.$label, Select.classNameOsAndroid);
				}
			}

			if (this._config.useDefaultOptionList) {
				this.addClass(Select.classNameUseDefaultOptionList);
				Element.addClassTo(this.$wrapper, Select.classNameUseDefaultOptionList);
				Element.addClassTo(this.$label, Select.classNameUseDefaultOptionList);
			}

		}

		/**
		 * イベントの登録
		 *
		 * @version 0.4.1
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
				var $li: JQuery = $(e.target);
				var index: number = $li.index();
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
		 * スクロール位置を調整する
		 *
		 * @version 0.1.0
		 * @since 0.1.0
		 *
		 */
		private _scrollToSelectedPosition (): void {
			var $psuedoOptList: JQuery;
			var $psuedoOpt: JQuery;
			var optPos: JQueryCoordinates;
			var cntPos: JQueryCoordinates;
			if (this.$options) {
				$psuedoOptList = this.$options.find('li');
				this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
					var $opt: JQuery = $(opt);
					var isSelected: boolean = <boolean> $opt.prop('selected');
					if (isSelected) {
						$psuedoOpt = $psuedoOptList.eq(i);
					}
				});
				// ポジションを正しく取得するために一度スクロール位置をリセットする
				this.$options.scrollTop(0);
				optPos = $psuedoOpt.offset();
				cntPos = this.$options.offset();
				if (optPos && cntPos) {
					this.$options.scrollTop(optPos.top - cntPos.top);
				}
			}
		}

		/**
		 * 擬似要素にフォーカスがあったった時のイベントと伝達を制御する
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
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 * TODO: KeyCodeの数値をマジックナンバーにせずに定数から参照するようにする
		 *
		 */
		private _bindKeybordEvent (): void {
			$(document).on('keydown', (e: JQueryKeyEventObject): void => {
				if (this.hasFocus) {
					switch (e.keyCode) {
						// keyUp
						case 38: {
							this.prev(true);
							this._scrollToSelectedPosition();
							e.preventDefault();
							break;
						}
						// keyDown
						case 40: {
							this.next(true);
							this._scrollToSelectedPosition();
							e.preventDefault();
							break;
						}
						// Return (Enter)
						case 13: {
							if (this._currentIndex !== this.getIndex()) {
								this._fireChangeEvent();
							}
							this._onblur();
							e.preventDefault();
							break;
						}
					}
				}
			});
		}

		/**
		 * フォーカスがあたった時の処理
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
				Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
				Element.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
				// スクロール位置を調整する
				this._scrollToSelectedPosition();
				// 一覧を開いた時のインデックス番号を記録する
				this._currentIndex = this.getIndex();
			}
		}

		/**
		 * フォーカスがはずれた時の処理
		 *
		 * @version 0.1.0
		 * @since 0.0.1
		 *
		 */
		protected _onblur (): void {
			// 一旦 コンストラクタのsuper()の中で_onblur()が$pseudoプロパティを作成する前に呼び出されるため
			if (this.$pseudo) {
				super._onblur();
				Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
				Element.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
			}
		}

		/**
		 * 要素の状態を更新する
		 *
		 * @version 0.4.1
		 * @since 0.0.1
		 *
		 */
		private _update (): void {

			var $selectedOption: JQuery
			var $psuedoOptList: JQuery;

			$selectedOption = this.$el.find(':selected');

			if (this.$options) {
				$psuedoOptList = this.$options.find('li');
			}

			this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
				var $opt: JQuery = $(opt);
				var isSelected: boolean;
				var $psuedoOpt: JQuery;
				isSelected = <boolean> $opt.prop('selected');
				if (isSelected) {
					this.$selected.text($opt.text());
				}
				if (this.$options) {
					$psuedoOpt = $psuedoOptList.eq(i);
					$psuedoOpt.attr('aria-selected', <string> '' + isSelected);
					if (isSelected) {
						Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
						Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
					} else {
						Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
						Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
					}
				}
			});

		}

		/**
		 * 値を設定する
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 * @override
		 *
		 */
		public setValue (value: string | number | boolean): void {
			var valueString: string = String(value);
			var $targetOption: JQuery = this.$el.find('option[value="' + valueString + '"]');
			if ($targetOption.length && !$targetOption.prop('selected')) {
				$targetOption.prop('selected', true);
				this._fireChangeEvent();
			}
		}

		/**
		 * 値をインデックス番号から設定する
		 *
		 * @version 0.4.1
		 * @since 0.4.0
		 *
		 */
		public setIndex (index: number, isSilent: boolean = false): void {
			var $targetOption: JQuery = this.$el.find('option').eq(index);
			if ($targetOption.length && !$targetOption.prop('selected')) {
				$targetOption.prop('selected', true);
				this._fireChangeEvent(isSilent);
			}
		}

		/**
		 * 現在の選択中のインデックス番号を取得する
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		public getIndex (): number {
			var currentIndex: number = 0;
			this.$el.find('option').each( (i: number, el: HTMLElement): void => {
				var $opt = $(el);
				if ($opt.prop('selected')) {
					currentIndex = $opt.index();
				}
			});
			return currentIndex;
		}

		/**
		 * 次の項目を選択する
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		public next (isSilent: boolean): void {
			var currentIndex: number = this.getIndex();
			var max: number = this.$el.find('option').length;
			var nextIndex: number = currentIndex + 1;
			this.setIndex(Math.min(nextIndex, max), isSilent);
		}

		/**
		 * 前の項目を選択する
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		public prev (isSilent: boolean): void {
			var currentIndex: number = this.getIndex();
			var prevIndex: number = currentIndex - 1;
			this.setIndex(Math.max(prevIndex, 0), isSilent);
		}

		/**
		 * 無効状態を設定する
		 *
		 * @version 0.4.1
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

	}

}
