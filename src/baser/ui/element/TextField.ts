module baser.ui.element {

	/**
	 * TextFieldクラスのオプションハッシュのインターフェイス
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	export interface TextFieldOption extends FormElementOption {

		/**
		 *
		 * @since 0.0.0
		 *
		 */

	}

	/**
	 * テキストフィールドの拡張クラス
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	export class TextField extends FormElement implements ITextField {

		/**
		 * オプションのデフォルト値
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		static defaultOption: TextFieldOption = {

		};

		/**
		 * TextField要素のクラス
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		static classNameTextField: string = 'form-text-field';

		/**
		 * 未入力状態に付加されるクラス
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		static classNameStateUninput: string = 'uninput';

		/**
		 * プレースホルダー属性に対応しているかどうか
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		static supportPlaceholder: boolean = $('<input />').prop('placeholder') !== undefined;

		/**
		 * 空かどうか
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		public isEmpty: boolean;
		/**
		 * プレースホルダーテキスト
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		public placeholder: string = '';

		/**
		 * プレースホルダーをもっているかどうか
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		public hasPlaceholder: boolean;

		/**
		 * オプション情報
		 *
		 * @since 0.4.1
		 *
		 */
		protected _config: TextFieldOption;

		/**
		 * コンストラクタ
		 *
		 * @version 0.4.1
		 * @since 0.4.0
		 * @param $el 管理するDOM要素のjQueryオブジェクト
		 * @param options オプション
		 *
		 */
		constructor ($el: JQuery, options: TextFieldOption) {

			super($el, $.extend({}, TextField.defaultOption, options));

			// IE6・7は反映させない
			if (!$el[0].querySelector) {
				return;
			}

			this.placeholder = this.$el.attr('placeholder') || '';
			this.hasPlaceholder = !!this.placeholder;

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
			this.addClass(TextField.classNameTextField);
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
			Element.addClassTo(this.$wrapper, TextField.classNameTextField + '-' + FormElement.classNameWrapper);
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

			// keyupイベントが起こった場合に実行するルーチン
			$(document).on('keyup.bcTextField-' + this.id, (e: JQueryKeyEventObject): void => {
				if (this.hasFocus) {
					this._update();
				}
			});

			// プレースホルダーをサポートしていない時のイベント処理
			if (!TextField.supportPlaceholder) {
				// フォーカスを当てた時・クリックをしたときにプレースホルダーと値が同じだった場合
				// カーソル（キャレット）を先頭に持っていく
				this.$el.on('focus.bcTextField click.bcTextField', (): void => {
					if (this._equalPlaceholder()) {
						this._msCaretMoveToTop();
					}
				});
				// キーボードを押した瞬間に、プレースホルダーと値が同じだった場合
				// プレースホルダーの値を消して、空にする
				// TODO: 文字以外のキーを押すと一瞬値が消える（クリティカルでないため保留）
				$(document).on('keydown.bcTextField-' + this.id, (e: JQueryKeyEventObject): void => {
					if (this.hasFocus) {
						if (this._equalPlaceholder()) {
							this.$el.val('');
						}
					}
				});
			}

		}

		/**
		 * 要素の状態を更新する
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		private _update (): void {

			var currentValue: string = this.$el.val() || '';
			var isEmpty: boolean = !currentValue;

			if (TextField.supportPlaceholder) {
				if (isEmpty) {
					this._setStateUninputted();
				} else {
					this._setStateInputted();
				}
			} else {
				if (this._equalPlaceholder()) {
					this._setStateUninputted();
				} else {
					if (isEmpty) {
						this._setStateUninputted();
						this._setPlaceholderValue();
					} else {
						this._setStateInputted();
					}
				}
			}

		}

		/**
		 * 入力されている状態を設定する
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		private _setStateInputted (): void {
			this.isEmpty = false;
			Element.removeClassFrom(
				this.$el,
				FormElement.classNameFormElementCommon,
				'',
				TextField.classNameStateUninput);
			Element.removeClassFrom(
				this.$label,
				FormElement.classNameFormElementCommon,
				FormElement.classNameLabel,
				TextField.classNameStateUninput);
			Element.removeClassFrom(
				this.$wrapper,
				FormElement.classNameWrapper,
				'',
				TextField.classNameStateUninput);
		}

		/**
		 * 入力されていない状態を設定する
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		private _setStateUninputted (): void {
			this.isEmpty = true;
			Element.addClassTo(
				this.$el,
				FormElement.classNameFormElementCommon,
				'',
				TextField.classNameStateUninput);
			Element.addClassTo(
				this.$label,
				FormElement.classNameFormElementCommon,
				FormElement.classNameLabel,
				TextField.classNameStateUninput);
			Element.addClassTo(
				this.$wrapper,
				FormElement.classNameWrapper,
				'',
				TextField.classNameStateUninput);
		}

		/**
		 * プレースホルダーと値が同じかどうか
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		private _equalPlaceholder (): boolean {
			var currentValue: string = this.$el.val() || '';
			return this.placeholder === currentValue;
		}

		/**
		 * プレースホルダーの値を設定する
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		private _setPlaceholderValue (): void {
			this.$el.val(this.placeholder);
			this._msCaretMoveToTop();
		}

		/**
		 * 【IE用】カーソル（キャレット）を先頭に持っていく
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		private _msCaretMoveToTop (): void {
			// TODO: MS用の型を調査して定義
			var input: any = this.$el[0];
			var range: any = input.createTextRange();
			range.collapse();
			range.moveStart('character', 0);
			range.moveEnd('character', 0);
			range.select();
		}

	}

}
