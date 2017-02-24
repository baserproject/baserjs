/**
 * プリミティブ型かどうか判定
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param obj 対象のオブジェクト
 * @return プリミティブ型であれば真
 *
 */
export default function isPrimitive (obj: Object) {
	return (
		obj === undefined
		||
		obj === null
		||
		typeof obj === 'boolean'
		||
		typeof obj === 'number'
		||
		typeof obj === 'string'
		||
		typeof obj === 'symbol'
	);
}
