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
			export class FormElement extends Element {

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
				 * フォーカスがあたっている状態かどうか
				 *
				 * @since 0.1.0
				 *
				 */
				public hasFocus: boolean = false;

				/**
				 * 削除予定
				 * フォーカスがあたっている状態かどうか
				 *
				 * @deprecated
				 * @since 0.0.1
				 *
				 */
				public isFocus: boolean = false;

				/**
				 * ラベルのテキスト
				 *
				 * @since 0.0.1
				 *
				 */
				public label: string;

				/**
				 * ラベル要素のjQueryオブジェクト
				 *
				 * @since 0.0.1
				 *
				 */
				public $label: JQuery;

				/**
				 * ラベル要素にラップされているかどうか
				 *
				 * @since 0.0.4
				 *
				 */
				public isWrappedByLabel: boolean;

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
				 * @version 0.1.0
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: FormElementOption) {

					super($el);

					var config: FormElementOption = $.extend(FormElement.defaultOption, options);

					// 共通のクラスを付加
					this.addClass(FormElement.classNameFormElementCommon);

					// label要素の検索 & 生成
					var $label: JQuery;

					// 祖先のlabel要素を検索
					$label = this.$el.closest('label');

					// labelでネストされていたかどうか
					this.isWrappedByLabel = !!$label.length;

					if (!$label.length) {
						// for属性に関連づいたlabel要素を検索
						$label = $('[for="' + this.id + '"]');
					}
					if (config.autoLabeling && !$label.length) {
						// label(もしくは別の)要素の生成
						this.label = this.$el.attr('title') || config.label || this.$el.attr('name');
						$label = $('<' + config.labelTag.toLowerCase() + ' />');
						$label.insertAfter(this.$el);
						if (config.labelClass) {
							$label.addClass(config.labelClass);
						}
						if (this.label) {
							$label.text(this.label);
						}
						if (config.labelTag.toLowerCase() === 'label') {
							// labelを生成したのならfor属性にidを紐付ける
							$label.attr('for', this.id);
						}
					}
					this.$label = $label;

					Element.addClassTo($label, FormElement.classNameFormElementCommon);
					Element.addClassTo($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);

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

					this.$el.on('focus.bcFormElement', (): void => {
						this._onfocus();
					});

					this.$el.on('blur.bcFormElement', (): void => {
						this._onblur();
					});

					this._onblur();

					// フォーム要素に登録
					Form.elements.push(this);

				}

				/**
				 * フォーカスがあたった時の処理
				 *
				 * @version 0.1.0
				 * @since 0.0.1
				 *
				 */
				public _onfocus (): void {
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
				public _onblur (): void {
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

			}

		}

	}

}
