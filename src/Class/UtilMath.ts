import IDimension = require('../Interface/IDimension');

/**
 * ユーティリティ算術クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */
class UtilMath {

	/**
	 * 指定の範囲のランダムな数を返す
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 * @param base 基準の数
	 * @param dist 基準からこの数までの範囲の乱数になる
	 * @return 乱数
	 *
	 */
	public static random (base: number = 1, dist: number = 0): number {
		const random: number = Math.random();
		const from: number = Math.min(base, dist);
		const to: number = Math.max(base, dist);
		return random * (to - from) + from;
	}

	/**
	 * 配列内の数値の合計を算出する
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 * @param numberList 数の配列
	 * @return 合計値
	 *
	 */
	public static sum (numberList: number[]): number {
		const numbers: number[] = numberList.slice();
		let result: number = 0;
		while (numbers.length) {
			result += numbers.shift();
		}
		return result;
	}

	/**
	 * 均等に分割する
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 * @param n 分割される数
	 * @param devide 分割する数
	 * @return 分割された数値で構成された配列
	 *
	 */
	public static split (n: number, devide: number): number[] {
		const result: number[] = [];
		n = Math.floor(n);
		devide = Math.floor(devide);
		// 分割した数
		const splited: number = Math.floor(n / devide);
		if (0 < devide) {
			let i: number = devide;
			// 余り
			const rem: number = n % devide;
			// 余りの数だけ+1される
			let addtion: number = rem;
			while (i--) {
				if (0 < addtion || rem < 0 && 0 === addtion) {
					result.push(splited + 1);
				} else {
					result.push(splited);
				}
				addtion += rem < 0 ? 1 : -1;
			}
		}
		return result;
	}

	/**
	 * コンテナオブジェクトとターゲットオブジェクトのサイズから、
	 * ターゲットオブジェクトの収まる位置とサイズを算出する
	 *
	 * @version 0.13.0
	 *
	 * @param containerWidth コンテナの幅
	 * @param containerHeight コンテナの高さ
	 * @param targetWidth ターゲットの幅
	 * @param targetHeight ターゲットの高さ
	 * @param sizing ターゲットを収める基準 `"contain" | "cover"`
	 * @param align 水平位置 `"left" | "center" | "right"`
	 * @param valign 垂直位置 `"top" | "center" | "bottom"`
	 * @return 算出された位置とサイズ
	 */
	public static stretchDimension (containerWidth: number, containerHeight: number, targetWidth: number, targetHeight: number, sizing: 'contain' | 'cover' = 'contain', align: 'left' | 'center' | 'right' = 'center', valign: 'top' | 'center' | 'bottom' = 'center'): IDimension {
		let scale: number = 1;
		const objectAspectRatio: number = targetWidth / targetHeight;
		const containerAspectRatio: number = containerWidth / containerHeight;

		// オブジェクトの拡縮率の算出
		// アス比が1以上なら横長/1以下なら縦長
		// コンテナが横長
		switch (sizing) {
			case 'cover':
				if (1 < containerAspectRatio) {
					// オブジェクトが横長 もしくは コンテナのアス比の方が大きい
					if (1 < targetWidth && objectAspectRatio < containerAspectRatio) {
						scale = containerWidth / targetWidth;
					} else {
						scale = containerHeight / targetHeight;
					}
				// コンテナが縦長
				} else {
					// オブジェクトが横長 もしくは オブジェクトのアス比の方が大きい
					if (1 < targetHeight && containerAspectRatio < objectAspectRatio) {
						scale = containerHeight / targetHeight;
					} else {
						scale = containerWidth / targetWidth;
					}
				}
				break;
			case 'contain':
				if (1 < containerAspectRatio) {
					// オブジェクトが横長 もしくは コンテナのアス比の方が大きい
					if (1 < targetWidth && objectAspectRatio < containerAspectRatio) {
						scale = containerHeight / targetHeight;
					} else {
						scale = containerWidth / targetWidth;
					}
				// コンテナが縦長
				} else {
					// オブジェクトが横長 もしくは オブジェクトのアス比の方が大きい
					if (1 < targetHeight && containerAspectRatio < objectAspectRatio) {
						scale = containerWidth / targetWidth;
					} else {
						scale = containerHeight / targetHeight;
					}
				}
				break;
			default:
				// void
		}
		// オブジェクトの幅と高さ
		const width: number = targetWidth * scale;
		const height: number = targetHeight * scale;

		let top: number;
		switch (valign) {
			case 'top': {
				top = 0;
			}
			break;
			case 'bottom': {
				top = containerHeight - height;
			}
			break;
			default: {
				top = (containerHeight / 2) - (height / 2);
			}
		}

		let left: number;
		switch (align) {
			case 'left': {
				left = 0;
			}
			break;
			case 'right': {
				left = containerWidth - width;
			}
			break;
			default: {
				left = (containerWidth / 2) - (width / 2);
			}
		}

		return {
			width,
			height,
			top,
			left,
		};
	}

}

export = UtilMath;
