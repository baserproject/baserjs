module baser {

	export module ui {

		/**
		 * Box管理を担うクラス
		 *
		 * @version 0.1.0
		 * @since 0.0.15
		 *
		 */
		export class Box {

			static alignment ($target: JQuery, columns: number, callback: Function, breakPoint: number = 0): JQuery {
				var tiles: JQuery[] = null;
				var max = null;
				var c: number = null;
				var h = null;
				var last: number = $target.length - 1;
				var s = null;
				if (!columns) {
					columns = $target.length;
				}
				$target.each(function (i: number) {
					var s: CSSStyleDeclaration;
					var tile: JQuery;
					var j: number, l: number;
					var cancel: boolean = false;
					if (breakPoint < window.document.documentElement.clientWidth) {
						s = this.style;
						s.removeProperty('height');
						c = i % columns;
						if (c === 0) {
							tiles = [];
						}
						tile = tiles[c] = $(this);
						h = tile.height();
						if (c === 0 || h > max) {
							max = h;
						}
						if (i === last || c === columns - 1) {
							l = tiles.length;
							for (j = 0; j < l; j++) {
								if (tiles[j]) {
									if ($.isFunction(callback)) {
										cancel = !callback.call($target, max, h, tiles);
									}
									if (!cancel) {
										tiles[j].height(max);
									}
								}
							}
						}
					}
				});
				return $target;
			}

			// 文字の大きさを確認するためのdummyChar要素
			static createChar (): void {
				var dummyChar: HTMLElement;
				var $dummyChar: JQuery = $('<p>M</p>').css({
					display: 'block',
					visibility: 'hidden',
					position: 'absolute',
					padding: 0,
					top: 0,
				});
				$dummyChar.appendTo('body');
				Box.settings.dummyChar = $dummyChar[0];
				Box.settings.currentSize = Box.settings.dummyChar.offsetHeight;
			}

			// 文字の大きさが変わったか
			static isChanged (): boolean {
				if (Box.settings.currentSize === Box.settings.dummyChar.offsetHeight) {
					return false;
				}
				Box.settings.currentSize = Box.settings.dummyChar.offsetHeight;
				return true;
			}

			// 文書を読み込んだ時点で
			// 文字の大きさを確認しておく
			// 文字の大きさが変わっていたら、
			// handlers中の関数を順に実行
			static observer (): void {
				if (Box.isChanged()) {
					Box.reflatting();
				}
				return;
			}

			// 高さ揃えを再実行する処理
			static reflatting (): void {
				var settings: any = Box.settings;
				var i: number;
				var l: number = settings.sets.length;
				var set: any;
				for (i = 0; i < l; i++) {
					set = Box.settings.sets[i];
					set.height('auto');
					Box.alignment(set, settings.columns[i], settings.callbacks[i], settings.breakPoints[i]);
				}
				return;
			}

			static init (): void {
				var $w: JQuery;
				if (!Box.isInitialized) {
					$w = $(window);
					$w.load(Box.reflatting);
					$w.resize(Box.reflatting);
					Box.isInitialized = true;
					Box.createChar();
					// TODO: オプションでタイマーを回すのを制御できるようにする
					// TODO: ストップする関数を作る
					window.setInterval(Box.observer, Box.settings.interval);
				}
			}

			static isInitialized: boolean = false;

			static settings: any = {
				handlers: [],
				interval: 1000,
				currentSize: 0,
				dummyChar: null,
				sets: [],
				columns: [],
				callbacks: [],
				breakPoints: [],
			}


		}
	}


}
