/**
 * ユーティリティ算術クラス
 *
 * @version 0.2.0
 * @since 0.0.2
 *
 */
class UtilMath {

	/**
	 * 指定の範囲のランダムな数を返す
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 * @param base 基準の数
	 * @param dist 基準からこの数までの範囲の乱数になる
	 * @return 乱数
	 *
	 */
	static random (base: number = 1, dist: number = 0): number {
		var random: number = Math.random();
		var from: number = Math.min(base, dist);
		var to: number = Math.max(base, dist);
		return random * (to - from) + from;
	}

	/**
	 * 配列内の数値の合計を算出する
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 * @param numberList 数の配列
	 * @return 合計値
	 *
	 */
	static sum (numberList: number[]): number {
		var result: number = 0;
		var i: number = 0;
		var l: number = numberList.length;
		for (; i < l; i++) {
			result += numberList[i];
		}
		return result;
	}

	/**
	 * 均等に分割する
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 * @param n 分割される数
	 * @param devide 分割する数
	 * @param returnInfo 詳細情報を返すかどうか
	 * @return `returnInfo`が真の場合 分割された数値で構成された配列を、偽の場合 詳細情報と結果を返す
	 *
	 */
	static split (n: number, devide: number, returnInfo: boolean = false): any {
		n = Math.floor(n);
		devide = Math.floor(devide);
		// 分割した数
		var splited: number = Math.floor(n / devide);
		// 余り
		var rem: number = n % devide;
		// 余りの数だけ+1される
		var addtion: number = rem;
		var result: number[] = [];
		var i: number = devide;
		if (!(devide <= 0)) {
			while (i--) {
				if (0 < addtion || rem < 0 && 0 === addtion) {
					result.push(splited + 1);
				} else {
					result.push(splited);
				}
				addtion -= rem < 0 ? -1 : 1;
			}
		}
		if (returnInfo) {
			return {
				result: result,
				commonNumber: splited,
				addtion: rem
			};
		} else {
			return result;
		}
	}
}

export = UtilMath;