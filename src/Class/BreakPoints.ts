import EventDispatcher = require('./EventDispatcher');
import Browser = require('./Browser');
import BreakPointsOption = require('../Interface/BreakPointsOption');

/**
 * ブレークポイントの変化に応じた処理をする管理することができるクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 * ```
 * new BreakPoints({
 * 	340: 'sp',
 * 	768: 'tab',
 * 	1200: 'pc',
 * 	'default': 'bigger'
 * }, (value, breakPoint, windowWidth) => {
 * 	// ブレークポイントが340以下なら value = 'sp' など
 *  // 指定のブレークポイントを跨いだ際にしか発火しない
 * });
 * ```
 *
 */
class BreakPoints<T> extends EventDispatcher {

	/**
	 * 現在のブレークポイント（ウィンドウの幅）
	 *
	 * @version 0.8.1
	 * @since 0.7.0
	 *
	 */
	public currentPoint: number = 0;

	/**
	 * ブレークポイント
	 *
	 * @version 0.8.1
	 * @since 0.7.0
	 *
	 */
	public breakPoints: number[] = [];

	/**
	 * ブレークポイントに対してハンドラに渡す値
	 *
	 * @version 0.8.1
	 * @since 0.7.0
	 *
	 */
	private _values: BreakPointsOption<any> = {};

	/**
	 * コンストラクタ
	 *
	 * @version 0.9.1
	 * @since 0.7.0
	 * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
	 * @param callback 変化に応じたコールバック
	 *
	 */
	constructor (breakPoints: BreakPointsOption<T>, callback?: { (value: T, breakPoint: number, windowWidth: number): void } ) {
		super();
		this._setBreakPoints<T>(breakPoints);
		Browser.browser.on('resizeend', (): void => {
			const wW: number = Math.max(window.document.documentElement.clientWidth, window.innerWidth);
			for (let overPoint of this.breakPoints) {
				if (wW <= overPoint) {
					if (this.currentPoint !== overPoint) {
						this.currentPoint = overPoint;
						let value: T = <T> this._values[overPoint];
						if (callback) {
							callback(value, overPoint, wW);
						}
						this.trigger('breakpoint', [value, overPoint, wW], this);
						this.trigger(`breakpoint:${overPoint}`, [value, wW], this);
					}
					break;
				}
			}
		});
		Browser.browser.trigger('resizeend');
	}

	/**
	 * ブレークポイントを追加する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
	 *
	 */
	public add<T> (breakPoints: BreakPointsOption<T>): void {
		this._setBreakPoints<T>(breakPoints);
	}

	/**
	 * ブレークポイントの登録処理
	 *
	 * @version 0.8.1
	 * @since 0.7.0
	 * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
	 *
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

}

export = BreakPoints;
