/**
 * ユニークIDを発行する
 *
 * @version 0.9.0
 * @since 0.0.1
 * @param prefix 接頭辞
 * @return ユニークID
 *
 */
export default function createUID (prefix: string = 'uid'): string {
	const random: number = Math.random() * 1e8;
	const seed: number = new Date().valueOf();
	const uniqueNumber: number = Math.abs(Math.floor(random + seed));
	if (prefix) {
		prefix += '-';
	}
	return `${prefix}${uniqueNumber.toString(24)}`;
}
