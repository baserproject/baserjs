import test from 'ava';

import isDOMValue from '../lib/fn/isDOMValue';

test('isDOMValue', t => {
	t.true(isDOMValue(null));
	t.true(isDOMValue(true));
	t.true(isDOMValue(false));
	t.true(isDOMValue(''));
	t.true(isDOMValue('0'));
	t.true(isDOMValue('1'));
	t.true(isDOMValue('a'));
	t.true(isDOMValue(0));
	t.true(isDOMValue(1));
	t.true(isDOMValue(-1));
	t.true(isDOMValue(Infinity));
	t.true(isDOMValue(-Infinity));
	t.true(isDOMValue(NaN));

	t.false(isDOMValue());
	t.false(isDOMValue(undefined));
	t.false(isDOMValue(void 0));
	t.false(isDOMValue({}));
	t.false(isDOMValue([]));
	t.false(isDOMValue(function () {}));
	t.false(isDOMValue(global));
	t.false(isDOMValue(new Map()));
	t.false(isDOMValue(new WeakMap()));
	t.false(isDOMValue(new Set()));
	t.false(isDOMValue(new WeakSet()));
	t.false(isDOMValue(Symbol('symbol')));
});
