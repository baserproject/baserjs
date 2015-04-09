module baser {

	export module ui {

		export module element {

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
				 * コンストラクタ
				 *
				 * @version 0.4.0
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: SelectOption) {

					var config: SelectOption = $.extend({}, FormElement.defaultOption, Select.defaultOption, options);

					super($el, config);

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
				 * ラベル要素内のテキストを取得する
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				protected _getLabelText (): string {
					var $labelClone: JQuery;
					if (this.$label.length) {
						$labelClone = this.$label.clone();
						$labelClone.find('select').remove();
						return $.trim($labelClone.text());
					} else {
						return '';
					}
				}

				/**
				 * ラベル要素を割り当てる
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 * @override
				 *
				 */
				protected _asignLabel (config: FormElementOption): void {
					var $elements: JQuery;
					super._asignLabel(config);
					$elements = this.$label.children().detach();
					this.$label.empty();
					this.$label.append($elements);
					Element.addClassTo(this.$label, Select.classNameSelect, FormElement.classNameLabel);
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
				 * @version 0.4.0
				 * @since 0.4.0
				 * @override
				 *
				 */
				protected _createPsuedoElements (config: SelectOption): void {
					this.$pseudo = $('<a />'); // Focusable
					this.$pseudo.attr('href', '#');
					this.$pseudo.appendTo(this.$label);
					Element.addClassTo(this.$pseudo, FormElement.classNameFormElementCommon);
					Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect);

					this.$selected = $('<span />');
					this.$selected.appendTo(this.$pseudo);
					Element.addClassTo(this.$selected, FormElement.classNameFormElementCommon);
					Element.addClassTo(this.$selected, Select.classNamePseudoSelect, Select.classNamePseudoSelectedDisplay);

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

					if (config.useDefaultOptionList) {
						this.addClass(Select.classNameUseDefaultOptionList);
						Element.addClassTo(this.$wrapper, Select.classNameUseDefaultOptionList);
						Element.addClassTo(this.$label, Select.classNameUseDefaultOptionList);
					}

				}

				/**
				 * イベントの登録
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				protected _bindEvents (config: SelectOption): void {
					super._bindEvents(config);
					/*
					this.$el.on('focus.bcFormElement', (): void => {
						this._onfocus();
					});

					this.$el.on('blur.bcFormElement', (): void => {
						this._onblur();
					});

					this.$el.on('change.bcFormElement', (): void => {
						this.trigger('change', null, this);
					});
					*/

					// changeイベントが起こった場合に実行するルーチン
					// TODO: changeイベントが重複する問題を検討する
					this.$el.on('change.bcSelect', (): void => {
						this._update();
						this._onblur();
					});

					// 擬似option要素を選択した時に実行する
					this.$options.on('click.bcSelect', 'li', (e: JQueryEventObject): void => {
						var $li: JQuery = $(e.target);
						var index: number = $li.index();
						this.setIndex(index);
						e.stopPropagation();
						e.preventDefault();
					});

					this.$pseudo.on('click.bcSelect', (e: JQueryEventObject): void => {
						e.preventDefault();
					});

					if (!config.useDefaultOptionList) {
						this._psuedoFocusEvent();
					} else {
						// href属性を削除することでフォーカスがあたらなくなる
						this.$pseudo.removeAttr('href');
					}

				}

				/**
				 * オプションが開かれた後にスクロール位置を調整する
				 *
				 * @version 0.1.0
				 * @since 0.1.0
				 *
				 */
				private _scrollToSelectedPosition (): void {
					var $psuedoOptList: JQuery = this.$options.find('li');
					var $psuedoOpt: JQuery;
					this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
						var $opt: JQuery = $(opt);
						var isSelected: boolean = <boolean> $opt.prop('selected');
						if (isSelected) {
							$psuedoOpt = $psuedoOptList.eq(i);
						}
					});
					// ポジションを正しく取得するために一度スクロール位置をリセットする
					this.$options.scrollTop(0);
					var optPos: JQueryCoordinates = $psuedoOpt.offset();
					var cntPos: JQueryCoordinates = this.$options.offset();
					if (optPos && cntPos) {
						this.$options.scrollTop(optPos.top - cntPos.top);
					}
				}

				/**
				 * 擬似要素にフォーカスがあったった時のイベント伝達を制御する
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 *
				 */
				private _psuedoFocusEvent (): void {

					this.$el.off('focus.bcFormElement');
					this.$el.off('blur.bcFormElement');

					this.$el.on('focus.bcSelect', (): void => {
						this.$pseudo.focus();
					});

					// ドキュメントのどこかをクリックしたらフォーカスがはずれる
					$(document).on('click.bcSelect', (): void => {
						this._onblur();
					});

					// 擬似セレクトボックスにフォーカス・またはクリックが起こった時に発火する
					this.$pseudo.on('focus.bcSelect', (e: JQueryEventObject): void => {
						this._onfocus();
						// ドキュメントに伝達しない
						e.stopPropagation();
					});
					this.$pseudo.on('click.bcSelect', (e: JQueryEventObject): void => {
						this._onfocus();
						// ドキュメントに伝達しない
						e.stopPropagation();
						// href="#"なのでデフォルトイベントを抑制
						e.preventDefault();
					});

				}

				/**
				 * フォーカスがあたった時の処理
				 *
				 * @version 0.1.0
				 * @since 0.0.1
				 *
				 */
				protected _onfocus () {
					if (!this.hasFocus) {
						// 全体のフォーカスを外す
						$(document).trigger('click.bcSelect');
						// 親クラスのフォーカスを実行
						super._onfocus();
						// DOMのclassを制御
						Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
						Element.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
						// オプションが開かれた後にスクロール位置を調整する
						this._scrollToSelectedPosition();
					}
				}

				/**
				 * フォーカスがはずれた時の処理
				 *
				 * @version 0.1.0
				 * @since 0.0.1
				 *
				 */
				protected _onblur () {
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
				 * @version 0.1.0
				 * @since 0.0.1
				 *
				 */
				private _update (): void {

					var $selectedOption: JQuery = this.$el.find(':selected');
					var $psuedoOptList: JQuery = this.$options.find('li');

					this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
						var $opt: JQuery = $(opt);
						var isSelected: boolean = <boolean> $opt.prop('selected');
						var $psuedoOpt: JQuery = $psuedoOptList.eq(i);
						if (isSelected) {
							this.$selected.text($opt.text());
						}
						$psuedoOpt.attr('aria-selected', <string> '' + isSelected);
						if (isSelected) {
							Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
							Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
						} else {
							Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
							Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
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
				 * @version 0.4.0
				 * @since 0.4.0
				 * @override
				 *
				 */
				public setIndex (index: number): void {
					var $targetOption: JQuery = this.$el.find('option').eq(index);
					if ($targetOption.length && !$targetOption.prop('selected')) {
						$targetOption.prop('selected', true);
						this._fireChangeEvent();
					}
				}

			}

		}

	}

}
