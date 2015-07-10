module baser.ui.element {

	/**
	 * ボックスの高さ揃えるときのコールバック
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */	
	export interface AlignedBoxCallback {
		(maxHeight: number, currentHeight: number, boxes: AlignedBoxes): boolean | void;
	}

	/**
	 * 高さ揃えをするボックスを管理するクラス
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	export class AlignedBoxes extends Element {

		/**
		 * jQuery dataに自信のインスタンスを登録するキー
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static DATA_KEY: string = 'bc-box';
		
		/**
		 * jQuery dataにUIDを登録するキー
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static DATA_KEY_ID: string = AlignedBoxes.DATA_KEY + '-id';

		/**
		 * 監視タイマーID
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static watchTimer: number;

		/**
		 * 監視の間隔
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static watchInterval: number = 1000;

		/**
		 * 監視タイマーが起動しているかどうか
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static isBooted: boolean = false;

		/**
		 * 現在の基準のフォントサイズ
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static currentFontSize: number;

		/**
		 * 監視対象のボックスグループ
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static groups: { [id: string]: AlignedBoxes } = {};

		/**
		 * 基準の文字要素
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static dummyCharElement: HTMLElement;

		/**
		 * 基準の文字要素を生成する
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static createChar (): void {
			var dummyChar: HTMLElement;
			var $dummyChar: JQuery = $('<del>M</del>').css({
				display: 'block',
				visibility: 'hidden',
				position: 'absolute',
				padding: 0,
				top: 0,
				zIndex: -1
			});
			$dummyChar.appendTo('body');
			AlignedBoxes.dummyCharElement = $dummyChar[0];
			AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
		}

		/**
		 * 文字の大きさが変わったかどうか
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static isChanged (): boolean {
			if (AlignedBoxes.currentFontSize === AlignedBoxes.dummyCharElement.offsetHeight) {
				return false;
			}
			AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
			return true;
		}

		/**
		 * 文字の大きさが変わったかどうかを監視するルーチン
		 *  
		 * 文字の大きさが変わればボックスのサイズを再設定する
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static observerForFontSize (): void {
			if (AlignedBoxes.isChanged()) {
				AlignedBoxes.reAlign();
			}
			return;
		}

		/**
		 * ボックスのサイズを再設定する
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static reAlign (): void {
			var uid: string;
			for (uid in AlignedBoxes.groups) {
				AlignedBoxes.groups[uid].trigger('realign');
			}
			return;
		}

		/**
		 * 監視タイマーを起動する
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		static boot (): void {
			var $w: JQuery;
			if (!AlignedBoxes.isBooted) {
				$w = $(window);
				$w.on('load', AlignedBoxes.reAlign);
				Browser.browser.on('resizeend', AlignedBoxes.reAlign);
				AlignedBoxes.isBooted = true;
				AlignedBoxes.createChar();
				AlignedBoxes.watchTimer = window.setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
			}
		}

		/**
		 * ブレークポイントに寄るカラム数
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		private _columns: BreakPoints<number>;

		/**
		 * ボックスの高さ揃えるときのコールバック
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		private _callback: AlignedBoxCallback;

		/**
		 * ボックスの高さ揃えるときのコールバック
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		private _currentColumn: number;

		/**
		 * コンストラクタ
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 * @param $el 対象のボックス要素
		 * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
		 * @param callback ボックスの高さ揃えるときのコールバック
		 */
		constructor ($el: JQuery, column: number | BreakPointsOption<number> = 0, callback?: AlignedBoxCallback) {
			super($el);
			
			AlignedBoxes.boot();
			
			var uid: string = this.$el.data(AlignedBoxes.DATA_KEY_ID);
			
			if (uid) {
				this.destroy();
			}

			uid = utility.String.UID();
			this.$el.data(AlignedBoxes.DATA_KEY_ID, uid);
			
			this.$el.data(AlignedBoxes.DATA_KEY, this);
			
			AlignedBoxes.groups[uid] = this;
			
			var columnInfo: BreakPointsOption<number>;
			
			if (typeof column === 'number') {
				columnInfo = {
					Infinity: column
				};
			} else {
				columnInfo = column;
			}

			this._columns = new BreakPoints<number>(columnInfo, (column: number, breakPoint: number, windowWidth: number): void => {
				this._currentColumn = column;
				this._align();
			});
			
			this._callback = callback;
			
			this._align();
			
			this.on('realign', (): void => {
				this._align();
			});
			
		}

		/**
		 * ボックスの高さ揃える
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		private _align (): void {
			var tiles: JQuery[];
			var max: number;
			var c: number;
			var h: number;
			var last: number = this.$el.length - 1;
			if (!this._currentColumn) {
				this._currentColumn = this.$el.length;
			}
			this.$el.each( (i: number, elem: HTMLElement): any => {
				var tile: JQuery;
				var j: number, l: number;
				var cancel: boolean = false;
				Element.removeCSSPropertyFromDOMElement('height', elem);
				c = i % this._currentColumn;
				if (c === 0) {
					tiles = [];
				}
				tile = tiles[c] = $(elem);
				h = tile.height();
				if (c === 0 || h > max) {
					max = h;
				}
				if (i === last || c === this._currentColumn - 1) {
					l = tiles.length;
					for (j = 0; j < l; j++) {
						if (tiles[j]) {
							if ($.isFunction(this._callback)) {
								cancel = !this._callback(max, h, this);
							}
							if (!cancel) {
								tiles[j].height(max);
							}
						}
					}
				}
			});
		}

		/**
		 * 高さ揃えを解除する
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		public destroy (): void {
			this.$el.each( (i: number, elem: HTMLElement): void => {
				var $this: JQuery = $(elem);
				var uid: string = $this.data(AlignedBoxes.DATA_KEY_ID);
				$this.removeData(AlignedBoxes.DATA_KEY_ID);
				if (uid in AlignedBoxes.groups) {
					delete AlignedBoxes.groups[uid];
				}
			});
		}

	}

}
