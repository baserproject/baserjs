module baser {

	export module ui {

		export module element {

			/**
			 * フォーム要素を扱う静的クラス
			 *
			 * @version 0.0.2
			 * @since 0.0.1
			 *
			 */
			export class Form {

				/**
				 * 管理対象の要素に付加するclass属性値のプレフィックス
				 *
				 * @since 0.0.1
				 *
				 */
				static className: string = '-bc-form-element';

				/**
				 * 管理対象要素リスト
				 *
				 * @since 0.0.1
				 *
				 */
				static elements: Element[] = [];

				/**
				 * ラジオボタンのname属性値で紐付いたブループを管理するリスト
				 *
				 * @since 0.0.1
				 *
				 */
				static radioGroups: { [index: string]: RadioGroup } = {};

				/**
				 * ラジオボタンを拡張する
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param $elem 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				static radio ($elem: JQuery, options?: CheckableElementOption): JQuery {

					var radio: Radio = new Radio($elem, options);

					return $elem;
				}

				/**
				 * チェックボックスを拡張する
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param $elem 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				static checkbox ($elem: JQuery, options?: CheckableElementOption): JQuery {

					var checkbox: Checkbox = new Checkbox($elem, options);

					return $elem;
				}

				/**
				 * セレクトボックスを拡張する
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param $elem 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				static select ($elem: JQuery, options?: FormElementOption): JQuery {

					var select: Select = new Select($elem, options);

					return $elem;
				}

				/**
				 * [未実装] 複数選択可セレクトボックスを拡張する
				 *
				 * @param $elem 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				static selectMultiple ($elem: JQuery): JQuery {
					return $elem;
				}

				/**
				 * [未実装] 妥当性チェックを拡張する
				 *
				 * @param $elem 管理するDOM要素のjQueryオブジェクト
				 * @param options オプション
				 *
				 */
				static valid ($elem: JQuery, options?: any): JQuery {
					return $elem;
				}

			}

		}

	}

}
