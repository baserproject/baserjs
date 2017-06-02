/**
 * ユニークIDを発行する
 *
 * @version 1.0.0
 * @since 0.0.1
 * @param prefix 接頭辞
 * @return ユニークID
 *
 */
export default function createUID (prefix: string = 'uid-'): string {
	const random = Math.random() * 1e8;
	const seed = new Date().valueOf();
	const uniqueNumber = Math.abs(Math.floor(random + seed));
	return `${prefix}${uniqueNumber.toString(24)}`;
}
