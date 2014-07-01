module baser {

	export module ui {

		export module element {

			var CLASS_SELECT: string = '-select';
			var CLASS_OPTION: string = '-option';
			var CLASS_PSEUDO: string = '-pseudo';
			var CLASS_FOCUS: string = '-focus';
			var CLASS_BLUR: string = '-blur';

			var $document = $(document);

			/**
			 * セレクトボックスの拡張クラス
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			export class Select extends FormElement {

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
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: CheckableElementOption) {

					super($el, options);

					this.$el.addClass(Form.className + CLASS_SELECT);

					var $elements:JQuery = this.$label.children().detach();
					this.$label.empty();
					this.$label.append($elements);
					this.$label.addClass(Form.className);
					this.$label.addClass(Form.className + CLASS_SELECT + '-label');

					this.$pseudo = $('<a />'); // Focusable
					this.$pseudo.attr('href', '#');
					this.$pseudo.appendTo(this.$label);
					this.$pseudo.addClass(Form.className);
					this.$pseudo.addClass(Form.className + CLASS_SELECT + CLASS_PSEUDO);

					this.$selected = $('<span />');
					this.$selected.text(this.label);
					this.$selected.appendTo(this.$pseudo);
					this.$selected.addClass(Form.className);
					this.$selected.addClass(Form.className + CLASS_SELECT + CLASS_PSEUDO + '-selected');

					this.$options = $('<ul />');
					this.$options.appendTo(this.$pseudo);
					this.$options.addClass(Form.className);
					this.$options.addClass(Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-list');
					this.$el.find('option').each( (i: number, opt: HTMLElement): void => {
						var $opt: JQuery = $(opt);
						var value: string = $opt.val();
						var text: string = $opt.text();
						var $psuedoOpt: JQuery = $('<li />');
						$psuedoOpt.appendTo(this.$options);
						$psuedoOpt.data('value', value);
						$psuedoOpt.text(text);
						$psuedoOpt.addClass(Form.className);
						$psuedoOpt.addClass(Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION);
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
						this._onchange();
					});

					this.$pseudo.on('click.bcSelect', (e: JQueryEventObject): void => {
						e.preventDefault();
					});

					if (Browser.spec.isTouchable) {
						if (Browser.spec.ua.iPhone) {
							this.$pseudo.on('click.bcSelect', (e: JQueryEventObject): void => {
								this.$label.focus();
							});
							this.$el.addClass(Form.className + CLASS_SELECT + '-os-iphone');
							this.$label.addClass(Form.className + CLASS_SELECT + '-os-iphone');
						} else if (Browser.spec.ua.android) {
							this.$el.addClass(Form.className + CLASS_SELECT + '-os-android');
							this.$label.addClass(Form.className + CLASS_SELECT + '-os-android');
						}
					} else {
						this._psuedoFocusEvent();
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

					this.$pseudo.on('focus.bcSelect', (e: JQueryEventObject): void => {
						e.stopPropagation();
						$document.trigger('click.bcSelect');
						this._onfocus();
					});

					this.$selected.on('click.bcSelect', (e: JQueryEventObject): void => {
						$document.trigger('click.bcSelect');
						this._onfocus();
						e.stopPropagation();
						e.preventDefault();
					});

					$document.on('click.bcSelect', (): void => {
						this._onblur();
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
				 * フォーカスがあたった時のルーチン
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @protected プロテクテッドメソッド想定
				 *
				 */
				public _onfocus () {
					super._onfocus();
					this.$pseudo.addClass(Form.className + CLASS_FOCUS);
					this.$pseudo.removeClass(Form.className + CLASS_BLUR);
				}

				/**
				 * フォーカスがはずれた時のルーチン
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @protected プロテクテッドメソッド想定
				 *
				 */
				public _onblur () {
					// 一旦 コンストラクタのsuper()の中で_onblur()が$pseudoプロパティを作成する前に呼び出されるため
					if (this.$pseudo) {
						super._onblur();
						this.$pseudo.addClass(Form.className + CLASS_BLUR);
						this.$pseudo.removeClass(Form.className + CLASS_FOCUS);
					}
				}

				/**
				 * 要素の状態を更新する
				 *
				 * @version 0.0.1
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
							$psuedoOpt.addClass(Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-selected');
							$psuedoOpt.removeClass(Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-unselected');
						} else {
							$psuedoOpt.addClass(Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-unselected');
							$psuedoOpt.removeClass(Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-selected');
						}
					});

				}

			}

		}

	}

}