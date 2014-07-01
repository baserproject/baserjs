module baser {

	export module ui {

		export module element {

			/**
			 * DOM要素の抽象クラス
			 *
			 * @version 0.0.2
			 * @since 0.0.1
			 *
			 */
			export class Element {

				/**
				 * 管理するDOM要素のjQueryオブジェクト
				 *
				 * @since 0.0.1
				 *
				 */
				public $el: JQuery;

				/**
				 * 管理するDOM要素のid属性値
				 *
				 * @since 0.0.1
				 *
				 */
				public id: string;

				/**
				 * 管理するDOM要素のname属性値
				 *
				 * @since 0.0.1
				 *
				 */
				public name: string = '';

				/**
				 * コンストラクタ
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 *
				 */
				constructor ($el: JQuery) {
					this.$el = $el;

					// IDの抽出 & 生成
					this.id = this.$el.attr('id');
					if (!this.id) {
						this.id = utility.String.UID();
						this.$el.attr('id', this.id);
					}

					var name: string = this.$el.attr('name');
					if (name) {
						this.name = name;
					}

				}

			}

		}

	}

}
