module baser {

	export module ui {

		export module element {

			/**
			 * ラジオボタンのname属性値で紐付いたブループを管理するクラス
			 *
			 * @since 0.0.1
			 *
			 */
			export class RadioGroup {

				/**
				 * ラジオボタンのリスト
				 *
				 * @since 0.0.1
				 *
				 */
				public radioButtons: Radio[] = [];

				/**
				 * 紐づくname属性値
				 *
				 * @since 0.0.1
				 *
				 */
				public name: string;

				/**
				 * コンストラクタ
				 *
				 * @since 0.0.1
				 * @param name 紐づくname属性値
				 *
				 */
				constructor (name: string) {

					this.name = name;

				}

				/**
				 * 紐づくラジオボタンを追加する
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param radio 拡張ラジオボタン
				 *
				 */
				public add (radio: Radio) {

					var i: number = 0;
					var l: number = this.radioButtons.length;

					for (; i < l; i++) {
						if (this.radioButtons[i] === radio) {
							return;
						}
					}

					this.radioButtons.push(radio);

				}

				/**
				 * 管理するラジオボタンの状態を更新する
				 *
				 * @version 0.0.1
				 * @since 0.0.1
				 * @param ignoreRadio 対象外のラジオボタン
				 *
				 */
				public update (ignoreRadio: Radio) {

					var i: number = 0;
					var l: number = this.radioButtons.length;

					for (; i < l; i++) {
						if (this.radioButtons[i] !== ignoreRadio) {
							this.radioButtons[i].update();
						}
					}

				}

			}

		}

	}

}
