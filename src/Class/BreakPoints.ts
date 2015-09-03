import EventDispacher = require('./EventDispacher');
import Browser = require('./Browser');
import BreakPointsOption = require('../Interface/BreakPointsOption');

/**
 * ブレークポイントの変化に応じた処理をする管理することができるクラス
 *
 * @version 0.8.1
 * @since 0.8.1
 *
 */
class BreakPoints<T> extends EventDispacher {

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
			var wW: number = window.document.documentElement.clientWidth;
			for (let i: number = 0, l: number = this.breakPoints.length; i < l; i++) {
				let overPoint: number = this.breakPoints[i];
				if (wW <= overPoint) {
					if (this.currentPoint !== overPoint) {
						this.currentPoint = overPoint;
						let value: T = <T> this._values[overPoint];
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
		Browser.browser.trigger('resizeend');
	}

	/**
	 * ブレークポイントの登録処理
	 *
	 * @version 0.8.1
	 * @since 0.7.0
	 * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
	 */
	private _setBreakPoints<T> (breakPoints: BreakPointsOption<T>): void {

		for (let breakPointStr in breakPoints) {
			if (breakPoints.hasOwnProperty(breakPointStr)) {
				let breakPoint: number;
				if (/^defaults?$/i.test(breakPointStr)) {
					breakPoint = Infinity;
				} else {
					breakPoint = parseFloat(breakPointStr);
				}
				if (breakPoint >= 1) {
					this.breakPoints.push(breakPoint);
					let value: T = breakPoints[breakPointStr];
					this._values[breakPoint] = value;
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

export = BreakPoints;