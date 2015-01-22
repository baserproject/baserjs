module baser {

	export module ui {

		export module element {

			/**
			 * セレクトボックスの拡張クラス
			 *
			 * @version 0.1.0
			 * @since 0.0.1
			 *
			 */
			export class Select extends FormElement {

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
				 * @version 0.1.0
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: CheckableElementOption) {

					super($el, options);

					this.addClass(Select.classNameSelect);

					Element.addClassTo(this.$wrapper, Select.classNameSelect + '-' + FormElement.classNameWrapper);

					var $elements: JQuery = this.$label.children().detach();
					this.$label.empty();
					this.$label.append($elements);
					Element.addClassTo(this.$label, Select.classNameSelect, FormElement.classNameLabel);

					this.$pseudo = $('<a />'); // Focusable
					this.$pseudo.attr('href', '#');
					this.$pseudo.appendTo(this.$label);
					Element.addClassTo(this.$pseudo, FormElement.classNameFormElementCommon);
					Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect);

					this.$selected = $('<span />');
					this.$selected.text(this.label);
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

					this._update();

					this.$el.on('change.bcSelect', (): void => {
						this._onchange();
					});

					this.$options.on('click.bcSelect', 'li', (e: JQueryEventObject): void => {
						var $li: JQuery = $(e.target);
						var index: number = $li.index();
						this.$el.find('option').eq(index).prop('selected', true);
						e.stopPropagation();
						e.preventDefault();
						// 標準の select 要素に登録されたイベントを発火
						this.$el.trigger('change');
					});

					this.$pseudo.on('click.bcSelect', (e: JQueryEventObject): void => {
						e.preventDefault();
					});

					if (Browser.spec.isTouchable) {
						if (Browser.spec.ua.iPhone) {
							this.$pseudo.on('click.bcSelect', (e: JQueryEventObject): void => {
								this.$label.focus();
							});
							this.addClass(Select.classNameOsIOs);
						} else if (Browser.spec.ua.android) {
							this.addClass(Select.classNameOsAndroid);
						}
					} else {
						this._psuedoFocusEvent();
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

					$(document).on('click.bcSelect', (): void => {
						this._onblur();
					});

					// 擬似セレクトボックスにフォーカス・またはクリックが起こった時に発火する

					this.$pseudo.on('focus.bcSelect', (e: JQueryEventObject): void => {
						this._onfocus();
						e.stopPropagation();
					});

					this.$pseudo.on('click.bcSelect', (e: JQueryEventObject): void => {
						this._onfocus();
						e.stopPropagation();
						e.preventDefault();
					});

				}

				/**
				 * チェンジイベントのハンドラ
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 *
				 */
				private _onchange (): void {

					this._update();

					this._onblur();

				}

				/**
				 * フォーカスがあたった時の処理
				 *
				 * @version 0.1.0
				 * @since 0.0.1
				 *
				 */
				public _onfocus () {
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
				public _onblur () {
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

			}

		}

	}

}
