module baser {

	export module ui {

		export module element {

			/**
			 * ボックス要素の抽象クラス
			 *
			 * @version 0.0.5
			 * @since 0.0.5
			 *
			 */
			export class Box extends Element {

				/**
				 * 管理対象の要素に付加するclass属性値のプレフィックス
				 *
				 * @version 0.0.5
				 * @since 0.0.5
				 *
				 */
				static className: string = '-bc-box-element';

				/**
				 * 管理対象の要素
				 *
				 * @version 0.0.5
				 * @since 0.0.5
				 *
				 */
				static boxes: string[] = [];

				/**
				 * ラジオボタンを拡張する
				 *
				 * @version 0.0.5
				 * @since 0.0.5
				 * @param $elem 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				static alignHeight ($elem: JQuery, options?: Object): JQuery {

					var box: Box = new Box($elem);

					box.alignHeight(options);

					return $elem;
				}

				/**
				 * コンストラクタ
				 *
				 * @version 0.0.5
				 * @since 0.0.5
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 *
				 */
				constructor ($el: JQuery) {

					super($el);

					this.$el.addClass(Box.className);

				}

				/**
				 * 高さをそろえる
				 *
				 * @version 0.0.5
				 * @since 0.0.5
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				public alignHeight (options?: Object): Box {


					return this;
				}

			}

		}

	}

}