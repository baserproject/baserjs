module baser {

	export module ui {

		/**
		 * Box管理を担うクラス
		 *
		 * @version 0.2.0
		 * @since 0.0.15
		 *
		 */
		export class Box {

			static align ($target: JQuery, columns: number, callback: Function, breakPoint: number = 0): JQuery {
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
			static observer (): void {
				if (Box.isChanged()) {
					Box.reAlign();
				}
				return;
			}

			// 高さ揃えを再実行する処理
			static reAlign (): void {
				var settings: any = Box.settings;
				var i: number;
				var l: number = settings.sets.length;
				var set: any;
				for (i = 0; i < l; i++) {
					set = Box.settings.sets[i];
					set.height('auto');
					Box.align(set, settings.columns[i], settings.callbacks[i], settings.breakPoints[i]);
				}
				return;
			}

			static boot (): void {
				var $w: JQuery;
				if (!Box.isBooted) {
					$w = $(window);
					$w.on('load', Box.reAlign);
					$w.on('resize', Box.reAlign);
					Box.isBooted = true;
					Box.createChar();
					// TODO: オプションでタイマーを回すのを制御できるようにする
					Box.watchTimer = window.setInterval(Box.observer, Box.settings.interval);
				}
			}

			static sleep (): void {
				var $w: JQuery = $(window);
				$w.off('load', Box.reAlign);
				$w.off('resize', Box.reAlign);
				window.clearInterval(Box.watchTimer);
			}

			static push ($target: JQuery, column: number = null, callback: Function = null, breakPoint: number = null): void {
				var uid: string = $target.data('-box-align-height-');
				if (uid) {
					this.destory($target);
				} else {
					uid = utility.String.UID();
					$target.data('-box-align-height-', uid);
				}
				Box.align($target, column, callback, breakPoint);
				Box.settings.uidList.push(uid);
				Box.settings.sets.push($target);
				Box.settings.columns.push(column);
				Box.settings.callbacks.push(callback);
				Box.settings.breakPoints.push(breakPoint);
			}

			static destory ($target) {
				$target.each(function () {
					this.style.removeProperty('height');
				});

				var uid: string = $target.data('-box-align-height-');
				var index: number = utility.Array.indexOf(Box.settings.uidList, uid);

				Box.settings.uidList = utility.Array.remove(Box.settings.uidList, index);
				Box.settings.sets = utility.Array.remove(Box.settings.sets, index);
				Box.settings.columns = utility.Array.remove(Box.settings.columns, index);
				Box.settings.callbacks = utility.Array.remove(Box.settings.callbacks, index);
				Box.settings.breakPoints = utility.Array.remove(Box.settings.breakPoints, index);

				if (Box.settings.uidList.length === 0) {
					this.sleep();
				}
			}

			static watchTimer: number;

			static isBooted: boolean = false;

			static settings: any = {
				interval: 1000,
				currentSize: 0,
				dummyChar: null,
				sets: [],
				columns: [],
				callbacks: [],
				breakPoints: [],
				uidList: []
			};

		}

	}

}
