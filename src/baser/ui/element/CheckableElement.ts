module baser {

	export module ui {

		export module element {

			var CLASS_STATE_CHECKED: string = '-state-checked';
			var CLASS_STATE_UNCHECKED: string = '-state-unchecked';

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
			 * @version 0.0.3
			 * @since 0.0.1
			 *
			 */
			export class CheckableElement extends FormElement {

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

					var config: CheckableElementOption = $.extend(FormElement.defaultOption, CheckableElement.defaultOption, options);

					this._checkedClass = config.checkedClass;

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
				 * @protected プロテクテッド想定
				 *
				 */
				public _onchenge () {

					this.checked = !this.checked;

					this._update();

				}

				/**
				 * 要素の状態を更新する
				 *
				 * @version 0.0.3
				 * @since 0.0.1
				 *
				 */
				private _update () {

					var checked: boolean = <boolean> this.$el.prop('checked');

					var checkedClass: string = Form.className + CLASS_STATE_CHECKED;
					var uncheckedClass: string = Form.className + CLASS_STATE_UNCHECKED;

					// WAI-ARIA属性
					this.$el.attr('aria-checked', <string> '' + checked);

					if (checked) {
						this.$el.removeClass(uncheckedClass);
						this.$el.addClass(checkedClass);
						this.$el.addClass(this._checkedClass);
						this.$label.removeClass(uncheckedClass);
						this.$label.addClass(checkedClass);
						this.$label.addClass(this._checkedClass);
					} else {
						this.$el.addClass(uncheckedClass);
						this.$el.removeClass(checkedClass);
						this.$el.removeClass(this._checkedClass);
						this.$label.addClass(uncheckedClass);
						this.$label.removeClass(checkedClass);
						this.$label.removeClass(this._checkedClass);
					}

					this.checked = checked;

				}

			}

		}

	}

}