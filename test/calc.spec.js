import test from 'ava';

import calc from '../lib/fn/calc';

test('throws', t => {
	// t.is(t.throws(e => calc(), Error).message, `Illegal number of arguments.`) ;
	// t.is(t.throws(e => calc(0), TypeError).message, `Invalid argument type [number]. An expected type is evaluable string.`) ;
	// t.is(t.throws(e => calc(1), TypeError).message, `Invalid argument type [number]. An expected type is evaluable string.`) ;
	// t.is(t.throws(e => calc({}), TypeError).message, `Invalid argument type [object]. An expected type is evaluable string.`) ;
	// t.is(t.throws(e => calc([]), TypeError).message, `Invalid argument type [object]. An expected type is evaluable string.`) ;
	// t.is(t.throws(e => calc(''), TypeError).message, `Invalid string format. An expression "" is empty.`) ;
	// t.is(t.throws(e => calc(' '), TypeError).message, `Invalid string format. An expression " " is empty.`) ;
	// t.is(t.throws(e => calc("\n"), TypeError).message, `Invalid string format. An expression "\n" is empty.`) ;
	// t.is(t.throws(e => calc('NaN'), SyntaxError).message, `Cannot evaluate "NaN" in "NaN".`) ;
// 	t.is(t.throws(e => calc('1 * Infinity'), SyntaxError).message, `Cannot evaluate "Infinity" in "1 * Infinity".`) ;
// 	t.is(t.throws(e => calc('2 * 2 * A'), SyntaxError).message, `Cannot evaluate "A" in "2 * 2 * A".`) ;
// 	t.is(t.throws(e => calc('2 * 2 * A'), SyntaxError).message, `Cannot evaluate "A" in "2 * 2 * A".`) ;
// 	t.is(t.throws(e => calc('* 2'), SyntaxError).message, `A operand is empry. Expected left operand.`) ;
// 	t.is(t.throws(e => calc('* 2 * 2'), SyntaxError).message, `A operand is empry. Expected left operand.`) ;
// 	t.is(t.throws(e => calc('* 2 * 2 * 2'), SyntaxError).message, `A operand is empry. Expected left operand.`) ;
// 	t.is(t.throws(e => calc('2 *  * 2'), SyntaxError).message, `A somewhere operand is empry.`) ;
// 	t.is(t.throws(e => calc('2 *  *  * 2'), SyntaxError).message, `A somewhere operand is empry.`) ;
// 	t.is(t.throws(e => calc('2 *'), SyntaxError).message, `A operand is empry. Expected right operand.`) ;
// 	t.is(t.throws(e => calc('2 * 2 *'), SyntaxError).message, `A operand is empry. Expected right operand.`) ;
// 	t.is(t.throws(e => calc('2 * 2 * 2 *'), SyntaxError).message, `A operand is empry. Expected right operand.`) ;
// 	t.is(t.throws(e => calc('2 * 2 * 2 * *'), SyntaxError).message, `A operand is empry. Expected right operand.`) ;
// 	t.is(t.throws(e => calc('0 / 0'), Error).message, `Divide by zero. "0 / 0".`) ;
// 	t.is(t.throws(e => calc('1 / 0'), Error).message, `Divide by zero. "1 / 0".`) ;
// 	t.is(t.throws(e => calc('200 / 0'), Error).message, `Divide by zero. "200 / 0".`) ;
});

// test('no operator', t => {
// 	t.is(calc('0'), 0);
// 	t.is(calc('00'), 0);
// 	t.is(calc('.0'), 0);
// 	t.is(calc('+0'), 0);
// 	t.is(calc('+00'), 0);
// 	t.is(calc('+.0'), 0);
// 	t.is(calc('-0'), 0);
// 	t.is(calc('-00'), 0);
// 	t.is(calc('-.0'), 0);
// 	t.is(calc('1'), 1);
// 	t.is(calc('01'), 1);
// 	t.is(calc('.1'), .1);
// 	t.is(calc('+1'), 1);
// 	t.is(calc('+01'), 1);
// 	t.is(calc('+.1'), .1);
// 	t.is(calc('-1'), -1);
// 	t.is(calc('-01'), -1);
// 	t.is(calc('-.1'), -.1);
// });

// test('single operator evaluates', t => {
// 	t.is(calc('0 * 0'), 0);
// 	t.is(calc('1 * 0'), 0);
// 	t.is(calc('1 * 1'), 1);
// 	t.is(calc('2 * 0'), 0);
// 	t.is(calc('2 * 1'), 2);
// 	t.is(calc('2 * 2'), 4);
// 	t.is(calc('9 * 9'), 81);
// 	t.is(calc('0 ** 0'), 1);
// 	t.is(calc('10 ** 0'), 1);
// 	t.is(calc('10 ** 1'), 10);
// 	t.is(calc('10 ** 2'), 100);
// 	t.is(calc('1 / 1'), 1);
// 	t.is(calc('2 / 1'), 2);
// 	t.is(calc('2 / 2'), 1);
// 	t.is(calc('9 / 9'), 1);
// 	t.is(calc('2048 / 2'), 1024);
// 	t.is(calc('4353 % 634'), 549);
// });

// test('multi operator recursive evaluates', t => {
// 	t.is(calc('0 * 0 * 1'), 0);
// 	t.is(calc('1 * 0 / 2'), 0);
// 	t.is(calc('5 / 5 * 3'), 3);
// 	t.is(calc('9 * 9 % 4'), 1);
// 	t.is(calc('0 ** 0 / 1 * 3'), 3);
// 	t.is(calc('10 ** 2 / 2 * 3'), 150);
// 	t.is(calc('2 / 1 * 5'), 10);
// 	t.is(calc('9 / 9 * 10 * 5'), 50);
// 	t.is(calc('234 / 3234 * 3 % 3 * 902'), 195.79591836734696);
// });

test('+- evaluates', t => {
// 	t.is(calc('0 + 0'), 0);
// 	t.is(calc('1 + 1'), 2);
// 	t.is(calc('100 + 10'), 110);
	// t.is(calc('100 - 10'), 90);
	// t.is(calc('1 - -1'), 2);
// 	t.is(calc('600 - 2000'), -1400);
// 	t.is(calc('2000'), 2000);
// 	t.is(calc('+2000'), 2000);
// 	t.is(calc('-2000'), -2000);
// 	t.is(calc('-+0'), 0);
// 	t.is(calc('-+00'), 0);
// 	t.is(calc('-+.0'), 0);
// 	t.is(calc('-+0+-++--++1'), 1);
// 	t.is(calc('-+00+-++-+-+1'), 1);
// 	t.is(calc('-+.0-+-+---1'), -1);
});

test('total', t => {
	// t.is(calc('0 + 0 * 0'), 0);
	// t.is(calc('1 + 1 * 1'), 2);
	// t.is(calc('1 * 1 + 1'), 2);
	// t.is(calc('2 * 2 + 2'), 6);
	// t.is(calc('2 + 2 * 2'), 6);
	// t.is(calc('1+2+3*6*2/4+3+3*3-2*2'), 20);
	// t.is(calc('2 + 2 * -2'), -2);
});


