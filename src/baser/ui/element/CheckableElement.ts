module baser {

	export module ui {

		export module element {

			/**
			 * CheckableElementクラスのオプションハッシュのインターフェイス
			 *
			 * @version 0.0.2
			 * @since 0.0.1
			 *
			 */
			export interface CheckableElementOption extends FormElementOption {

				/**
				 * チェック状態の時に付加されるclass属性値
				 *
				 * @since 0.0.1
				 *
				 */
				checkedClass?: string;

			}

			/**
			 * ラジオボタンとチェックボックスの抽象クラス
			 *
			 * @version 0.1.0
			 * @since 0.0.1
			 *
			 */
			export class CheckableElement extends FormElement implements ICheckableElement {

				/**
				 * オプションのデフォルト値
				 *
				 * @since 0.0.1
				 *
				 */
				static defaultOption: CheckableElementOption = {
					checkedClass: ''
				};

				/**
				 * CheckableElement関連の要素のチェック時に付加されるクラス
				 *
				 * @version 0.1.0
				 * @since 0.1.0
				 *
				 */
				static classNameStateChecked: string = 'checked';

				/**
				 * CheckableElement関連の要素のチェックがはずれた時に付加されるクラス
				 *
				 * @version 0.1.0
				 * @since 0.1.0
				 *
				 */
				static classNameStateUnchecked: string = 'unchecked';

				/**
				 * チェック状態
				 *
				 * @since 0.0.1
				 *
				 */
				public checked: boolean;

				/**
				 * 初期のチェック状態
				 *
				 * @since 0.0.1
				 *
				 */
				public defaultChecked: boolean;

				/**
				 * チェック状態の時に付加されるclass属性値
				 *
				 * @since 0.0.1
				 *
				 */
				private _checkedClass: string;

				/**
				 * オプション情報
				 *
				 * @since 0.4.1
				 *
				 */
				protected _config: CheckableElementOption;

				/**
				 * コンストラクタ
				 *
				 * @version 0.4.1
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				constructor ($el: JQuery, options: CheckableElementOption) {

					super($el, $.extend({}, CheckableElement.defaultOption, options));

					// IE6・7は反映させない
					if (!$el[0].querySelector) {
						return;
					}

					this._checkedClass = this._config.checkedClass;

					this.checked = this.$el.prop('checked');
					this.defaultChecked = this.$el.prop('defaultChecked');

					this._update();

					this.$el.on('change.bcCheckableElement', (): void => {
						this._onchenge();
					});

				}

				/**
				 * 要素の状態を更新する
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 *
				 */
				public update () {

					if (this.$el.prop('checked') !== this.checked) {
						this._update();
					}

				}

				/**
				 * 要素の状態を更新する
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 *
				 */
				protected _onchenge () {

					this.checked = !this.checked;

					this._update();

				}

				/**
				 * 要素の状態を更新する
				 *
				 * @version 0.1.0
				 * @since 0.0.1
				 *
				 */
				private _update () {

					var checked: boolean = <boolean> this.$el.prop('checked');

					// WAI-ARIA属性
					this.$el.attr('aria-checked', <string> '' + checked);

					if (checked) {

						this.$el.addClass(this._checkedClass);
						this.$label.addClass(this._checkedClass);
						this.$wrapper.addClass(this._checkedClass);

						Element.addClassTo(
							this.$el, FormElement.classNameFormElementCommon,
							'',
							CheckableElement.classNameStateChecked);
						Element.addClassTo(
							this.$label, FormElement.classNameFormElementCommon,
							FormElement.classNameLabel,
							CheckableElement.classNameStateChecked);
						Element.addClassTo(
							this.$wrapper, FormElement.classNameWrapper,
							'',
							CheckableElement.classNameStateChecked);
						Element.removeClassFrom(
							this.$el, FormElement.classNameFormElementCommon,
							'',
							CheckableElement.classNameStateUnchecked);
						Element.removeClassFrom(
							this.$label,
							FormElement.classNameFormElementCommon,
							FormElement.classNameLabel,
							CheckableElement.classNameStateUnchecked);
						Element.removeClassFrom(
							this.$wrapper,
							FormElement.classNameWrapper,
							'',
							CheckableElement.classNameStateUnchecked);

					} else {

						this.$el.removeClass(this._checkedClass);
						this.$label.removeClass(this._checkedClass);
						this.$wrapper.removeClass(this._checkedClass);

						Element.addClassTo(
							this.$el,
							FormElement.classNameFormElementCommon,
							'',
							CheckableElement.classNameStateUnchecked);
						Element.addClassTo(
							this.$label,
							FormElement.classNameFormElementCommon,
							FormElement.classNameLabel,
							CheckableElement.classNameStateUnchecked);
						Element.addClassTo(
							this.$wrapper,
							FormElement.classNameWrapper,
							'',
							CheckableElement.classNameStateUnchecked);
						Element.removeClassFrom(
							this.$el,
							FormElement.classNameFormElementCommon,
							'',
							CheckableElement.classNameStateChecked);
						Element.removeClassFrom(
							this.$label,
							FormElement.classNameFormElementCommon,
							FormElement.classNameLabel,
							CheckableElement.classNameStateChecked);
						Element.removeClassFrom(
							this.$wrapper,
							FormElement.classNameWrapper,
							'',
							CheckableElement.classNameStateChecked);

					}

					this.checked = checked;

				}

			}

		}

	}

}
