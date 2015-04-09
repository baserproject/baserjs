module baser {

	export module ui {

		export module element {

			/**
			 * FormElementクラスのオプションハッシュのインターフェイス
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			export interface FormElementOption {

				/**
				 * 任意で指定するラベル要素
				 *
				 * @since 0.0.1
				 *
				 */
				label?: string;

				/**
				 * 任意で指定するラベルのタグ名
				 *
				 * @since 0.0.1
				 * @default "label"
				 *
				 */
				labelTag?: string;

				/**
				 * 任意で指定するラベルに付加するクラス属性値
				 *
				 * @since 0.0.1
				 *
				 */
				labelClass?: string;

				/**
				 * 自動でラベルを生成するかどうか
				 *
				 * @since 0.0.5
				 * @default true
				 *
				 */
				autoLabeling?: boolean;
			}

			/**
			 * フォーム要素の抽象クラス
			 *
			 * @version 0.1.0
			 * @since 0.0.1
			 *
			 */
			export class FormElement extends Element implements IFormElement {

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
				 * ラベルのテキスト
				 *
				 * @since 0.0.1
				 *
				 */
				public label: string;

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
				 * コンストラクタ
				 *
				 * @version 0.4.0
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: FormElementOption) {

					super($el);

					var config: FormElementOption = $.extend({}, FormElement.defaultOption, options);

					// クラス名を設定す
					this._setClassName();

					// ラベル要素の割り当て
					this._asignLabel(config);

					// ラップ要素の割り当て
					this._createWrapper();

					// 擬似要素生成
					this._createPsuedoElements(config);

					// イベントを登録
					this._bindEvents(config);

					// 初期状態を設定
					this.defaultValue = this.$el.val();
					this.setDisabled(<boolean> $el.prop('disabled'));
					this._onblur();

					// フォーム要素に登録
					Form.elements.push(this);

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
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				protected _getLabelText (): string {
					if (this.$label.length) {
						return $.trim(this.$label.text());
					} else {
						return '';
					}
				}

				/**
				 * ラベル要素を割り当てる
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				protected _asignLabel (config: FormElementOption): void {
					var $label: JQuery;
					var hasLabel: boolean;

					// 祖先のlabel要素を検索
					$label = this.$el.closest('label');

					// label要素の存在
					hasLabel = !!$label.length;

					// labelでネストされていたかどうか
					this.isWrappedByLabel = hasLabel;

					// for属性に関連づいたlabel要素を取得
					if (!hasLabel) {
						$label = $('label[for="' + this.id + '"]');
						hasLabel = !!$label.length;
					}

					// ラベルがないときにラベル要素を生成する
					if (config.autoLabeling && !hasLabel) {
						// label(もしくは別の)要素の生成
						$label = $('<' + config.labelTag.toLowerCase() + ' />');
						$label.insertAfter(this.$el);
						if (config.labelClass) {
							$label.addClass(config.labelClass);
						}
						if (config.labelTag.toLowerCase() === 'label') {
							// labelを生成したのならfor属性にidを紐付ける
							$label.attr('for', this.id);
						}
					}

					Element.addClassTo($label, FormElement.classNameFormElementCommon);
					Element.addClassTo($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);

					this.$label = $label;
					this.label = config.label || this._getLabelText() ||  this.$el.attr('title') || this.$el.attr('name') || '';
				}

				/**
				 * ラップ要素を生成
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				protected _createWrapper (): void {
					var wrapperHtml: string = '<span />';
					var $wrapper = $(wrapperHtml);

					Element.addClassTo($wrapper, FormElement.classNameFormElementCommon);
					Element.addClassTo($wrapper, FormElement.classNameWrapper);

					if (this.isWrappedByLabel) {
						this.$label.wrapAll($wrapper);
						this.$wrapper = this.$label.parent('span');
					} else {
						this.$el.add(this.$label).wrapAll($wrapper);
						this.$wrapper = this.$el.parent('span');
					}
				}

				/**
				 * 擬似要素を生成する
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				protected _createPsuedoElements (config: FormElementOption): void {
					// void
				}

				/**
				 * イベントの登録
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				protected _bindEvents (config: FormElementOption): void {
					this.$el.on('focus.bcFormElement', (): void => {
						this._onfocus();
					});

					this.$el.on('blur.bcFormElement', (): void => {
						this._onblur();
					});

					this.$el.on('change.bcFormElement', (): void => {
						this.trigger('change', null, this);
					});
				}

				/**
				 * フォーカスがあたった時の処理
				 *
				 * @version 0.1.0
				 * @since 0.0.1
				 *
				 */
				protected _onfocus (): void {
					this.hasFocus = true;
					Element.addClassTo(
						this.$el,
						FormElement.classNameFormElementCommon,
						'',
						FormElement.classNameStateFocus);
					Element.addClassTo(
						this.$label,
						FormElement.classNameFormElementCommon,
						FormElement.classNameLabel,
						FormElement.classNameStateFocus);
					Element.addClassTo(
						this.$wrapper,
						FormElement.classNameWrapper,
						'',
						FormElement.classNameStateFocus);
					Element.removeClassFrom(
						this.$el,
						FormElement.classNameFormElementCommon,
						'',
						FormElement.classNameStateBlur);
					Element.removeClassFrom(
						this.$label,
						FormElement.classNameFormElementCommon,
						FormElement.classNameLabel,
						FormElement.classNameStateBlur);
					Element.removeClassFrom(
						this.$wrapper,
						FormElement.classNameWrapper,
						'',
						FormElement.classNameStateBlur);
				}

				/**
				 * フォーカスがはずれた時の処理
				 *
				 * @version 0.1.0
				 * @since 0.0.1
				 *
				 */
				protected _onblur (): void {
					this.hasFocus = false;
					Element.addClassTo(
						this.$el,
						FormElement.classNameFormElementCommon,
						'',
						FormElement.classNameStateBlur);
					Element.addClassTo(
						this.$label,
						FormElement.classNameFormElementCommon,
						FormElement.classNameLabel,
						FormElement.classNameStateBlur);
					Element.addClassTo(
						this.$wrapper,
						FormElement.classNameWrapper,
						'',
						FormElement.classNameStateBlur);
					Element.removeClassFrom(
						this.$el,
						FormElement.classNameFormElementCommon,
						'',
						FormElement.classNameStateFocus);
					Element.removeClassFrom(
						this.$label,
						FormElement.classNameFormElementCommon,
						FormElement.classNameLabel,
						FormElement.classNameStateFocus);
					Element.removeClassFrom(
						this.$wrapper,
						FormElement.classNameWrapper,
						'',
						FormElement.classNameStateFocus);
				}

				/**
				 * changeイベントを発火する
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				protected _fireChangeEvent () {
					var e: Event;
					if ('createEvent' in document) {
						e = document.createEvent('Event');
						e.initEvent('change', true, true);
						this.$el[0].dispatchEvent(e);
					} else {
						// IE8
						this.$el[0].fireEvent('onchange');
					}
				}

				/**
				 * 値を設定する
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				public setValue (value: string | number | boolean): void {
					var valueString: string = String(value);
					var currentValue: string = this.$el.val();
					if (currentValue !== valueString) {
						this.$el.val(valueString);
						this._fireChangeEvent();
					}
				}

				/**
				 * 無効状態を設定する
				 *
				 * @version 0.4.0
				 * @since 0.4.0
				 *
				 */
				public setDisabled (isDisabled: boolean): void {
					this.disabled = isDisabled;
					this.$el.prop('disabled', isDisabled);
					if (this.disabled) {
						Element.addClassTo(
							this.$el,
							FormElement.classNameFormElementCommon,
							'',
							FormElement.classNameStateDisabled);
						Element.addClassTo(
							this.$label,
							FormElement.classNameFormElementCommon,
							FormElement.classNameLabel,
							FormElement.classNameStateDisabled);
						Element.addClassTo(
							this.$wrapper,
							FormElement.classNameWrapper,
							'',
							FormElement.classNameStateDisabled);
					} else {
						Element.removeClassFrom(
							this.$el,
							FormElement.classNameFormElementCommon,
							'',
							FormElement.classNameStateDisabled);
						Element.removeClassFrom(
							this.$label,
							FormElement.classNameFormElementCommon,
							FormElement.classNameLabel,
							FormElement.classNameStateDisabled);
						Element.removeClassFrom(
							this.$wrapper,
							FormElement.classNameWrapper,
							'',
							FormElement.classNameStateDisabled);
					}
				}

			}

		}

	}

}
