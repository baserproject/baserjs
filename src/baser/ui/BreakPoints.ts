module baser.ui {
	
	export interface BreakPointsOption<T> {
		[ breakPoint: string ]: T;
	}

	/**
	 * ブレークポイントが変化したらコールバックを発火する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	export class BreakPoints<T> {
		
		public currentPoint: number = 0;
		public breakPoints: number[] = [];
		private _values: BreakPointsOption<any> = {};
		
		constructor (breakPoints: BreakPointsOption<T>, callback: { (value: T, breakPoint: number, windowWidth: number): void } ) {
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
							callback(value, overPoint, wW);
							break;
						}
					}
				}
			});
		}
		
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
		
		public add<T> (breakPoints: BreakPointsOption<T>): void {
			this._setBreakPoints<T>(breakPoints);
		}
		
	}
	
}