module baser {

	export module ui {

		export module element {

			var CLASS_LABEL: string = '-label';
			var CLASS_FOCUS: string = '-focus';
			var CLASS_BLUR: string = '-blur';

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
			}

			/**
			 * フォーム要素の抽象クラス
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			export class FormElement extends Element {

				/**
				 * オプションのデフォルト値
				 *
				 * @since 0.0.1
				 *
				 */
				static defaultOption: FormElementOption = {
					label: '',
					labelTag: 'label',
					labelClass: '',
				};

				/**
				 * フォーカスがあたっている状態かどうか
				 *
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
				 * コンストラクタ
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: FormElementOption) {
					super($el);

					this.$el.addClass(Form.className);

					var config: FormElementOption = $.extend(FormElement.defaultOption, options);

					// label要素の検索 & 生成
					var $label: JQuery;
					// 祖先のlabel要素を検索
					$label = this.$el.closest('label');
					if (!$label.length) {
						// for属性に関連づいたlabel要素を検索
						$label = $('[for="' + this.id + '"]');
					}
					if (!$label.length) {
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

					$label.addClass(Form.className);
					$label.addClass(Form.className + CLASS_LABEL);

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
				 * フォーカスがあたった時のルーチン
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @protected プロテクテッドメソッド想定
				 *
				 */
				public _onfocus (): void {
					this.isFocus = true;
					this.$el.addClass(Form.className + CLASS_FOCUS);
					this.$el.removeClass(Form.className + CLASS_BLUR);
					this.$label.addClass(Form.className + CLASS_FOCUS);
					this.$label.removeClass(Form.className + CLASS_BLUR);
				}

				/**
				 * フォーカスがはずれた時のルーチン
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @protected プロテクテッドメソッド想定
				 *
				 */
				public _onblur (): void {
					this.isFocus = false;
					this.$el.addClass(Form.className + CLASS_BLUR);
					this.$el.removeClass(Form.className + CLASS_FOCUS);
					this.$label.addClass(Form.className + CLASS_BLUR);
					this.$label.removeClass(Form.className + CLASS_FOCUS);
				}

			}

		}

	}

}
