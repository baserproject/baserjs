module baser.ui {
	
	export interface BreakPointsOption<T> {
		[ breakPoint: string ]: T;
	}

	/**
	 * ブレークポイントの変化に応じた処理をする管理することができるクラス
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	export class BreakPoints<T> extends event.EventDispacher {
		
		public currentPoint: number = 0;
		public breakPoints: number[] = [];
		private _values: BreakPointsOption<any> = {};
		
		/**
		 * コンストラクタ
		 * 
		 * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
		 * @param callback 変化に応じたコールバック
		 */
		constructor (breakPoints: BreakPointsOption<T>, callback?: { (value: T, breakPoint: number, windowWidth: number): void } ) {
			super();
			this._setBreakPoints<T>(breakPoints);
			Browser.browser.on('resizeend', (): void => {
				var i: number = 0;
				var l: number = this.breakPoints.length;
				var wW: number = window.document.documentElement.clientWidth;
				var overPoint: number;
				var value: T;
				for (; i < l; i++) {
					overPoint = this.breakPoints[i];
					if (wW <= overPoint) {
						if (this.currentPoint !== overPoint) {
							this.currentPoint = overPoint;
							value = <T> this._values[overPoint + ''];
							if (callback) {
								callback(value, overPoint, wW);
							}
							this.trigger('breakpoint', [value, overPoint, wW], this);
							this.trigger('breakpoint:' + overPoint, [value, wW], this);
						}
						break;
					}
				}
			});
		}
		
		/**
		 * ブレークポイントの登録処理
		 * 
		 * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
		 */
		private _setBreakPoints<T> (breakPoints: BreakPointsOption<T>): void {
			var breakPointStr: string;
			var breakPoint: number;
			var value: T;
			
			for (breakPointStr in breakPoints) {
				if (breakPoints.hasOwnProperty(breakPointStr)) {
					breakPoint = parseFloat(breakPointStr);
					if (breakPoint >= 1) {
						this.breakPoints.push(breakPoint);
						value = breakPoints[breakPointStr];
						this._values[breakPoint + ''] = value;
					}
				}
			}
			
			this.breakPoints.sort( (a: number, b: number): any => { return a - b; } );
		}

		/**
		 * ブレークポイントを追加する
		 * 
		 * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
		 */
		public add<T> (breakPoints: BreakPointsOption<T>): void {
			this._setBreakPoints<T>(breakPoints);
		}
		
	}
	
}