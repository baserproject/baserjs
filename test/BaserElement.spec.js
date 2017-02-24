import test from 'ava';
import { $ } from './helpers'

import BaserElement from '../lib/Classes/BaserElement';

test('::id', t => {
	const div = $(`<div id="BaserElement">BaserElement</div>`);
	const b = new BaserElement(div);
	t.is(b.id, 'BaserElement');
	t.is(b.el.id, 'BaserElement');
	t.is(b.el.id, b.id);
});

test('::el', t => {
	const div = $(`<div>BaserElement</div>`);
	const bDiv = new BaserElement(div);
	t.true(bDiv.el instanceof HTMLDivElement);
	const input = $(`<input>`);
	const bInput = new BaserElement(input);
	t.true(bInput.el instanceof HTMLInputElement);
});

test('::addClass', t => {
	const div = $(`<div id="BaserElement" class="z">BaserElement</div>`);
	const bDiv = new BaserElement(div);
	bDiv.addClass('a b c c b a');
	t.is(bDiv.el.outerHTML, `<div id="BaserElement" class="z a b c">BaserElement</div>`)
});

test('::getBoolAttr', t => {
	const div = $(`<div hidden aria-hidden="false" data-empty-string="">BaserElement</div>`);
	const bDiv = new BaserElement(div);
	t.true(bDiv.getBoolAttr('hidden'));
	t.false(bDiv.getBoolAttr('aria-hidden'));
	t.true(bDiv.getBoolAttr('data-empty-string'));
	t.false(bDiv.getBoolAttr('role'));

	const radio = $(`<input type="radio" checked="checked" alt="">`);
	const bRadio = new BaserElement(radio);
	t.true(bRadio.getBoolAttr('checked'));
	t.true(bRadio.getBoolAttr('alt'));
	t.false(bRadio.getBoolAttr('disabled'));
});

test('::pullProp', t => {
	const div = $(`
		<div
			hidden
			tabindex="1"
			aria-hidden="false"
			data-baser
			data-baser-title=""
			data-baser-role="test"
			data-baser-num="0"
			data-baser-json='{"a": 123, "b": {"c": 456}}'
			data-baser-param="a=123&b=c=456"
			>BaserElement</div>`);
	const bDiv = new BaserElement(div);
	t.is(bDiv.pullProp('hidden'), true);
	t.is(bDiv.pullProp('title'), '');
	t.is(bDiv.pullProp('tabIndex'), 1);
	t.is(bDiv.pullProp('onclick'), undefined);
	t.is(bDiv.pullProp('aria-hidden'), false);
	t.is(bDiv.pullProp('data-baser'), '');
	t.is(bDiv.pullProp('data-baser-title'), '');
	t.is(bDiv.pullProp('data-baser-role'), 'test');
	t.is(bDiv.pullProp('baserNum'), 0);
	t.is(bDiv.pullProp('children'), undefined);
	t.is(bDiv.pullProp('hidden', { hidden: false }), true);
	t.is(bDiv.pullProp('children', { children: 1 }), 1);
	t.is(bDiv.pullProp('children', { children: 2 }, {children: 1}), 2);
	t.is(bDiv.pullProp('children', { children: null }, {children: 1}), null);
	t.is(bDiv.pullProp('children', { children: undefined }, {children: 1}), 1);
	t.is(bDiv.pullProp('children', {}, {children: 1}), 1);
	t.is(bDiv.pullProp('children', bDiv, {children: 'child'}), 'child');
	t.deepEqual(bDiv.pullProp('baserJson'), {a: 123, b: {c: 456}});
	t.deepEqual(bDiv.pullProp('baserJson', {baserJson: {a: 987}}), {a: 123, b: {c: 456}});
	t.deepEqual(bDiv.pullProp('baserJson', {baserJson: {z: 987}}), {a: 123, b: {c: 456}, z: 987});
	t.deepEqual(bDiv.pullProp('baserJson', {baserJson: {z: 987, a: 876}}), {a: 123, b: {c: 456}, z: 987});
	t.deepEqual(bDiv.pullProp('baserJson', {baserJson: {z: 987, b: {d: 'DDD'}}}), {a: 123, b: {c: 456}, z: 987});
	t.deepEqual(bDiv.pullProp('baserJson', {baserJson: {z: 987, x: 345 }}, { baserJson: { y: 'YYY' } }), {a: 123, b: {c: 456}, z: 987, x: 345, y: 'YYY'});
	t.deepEqual(bDiv.pullProp('baserJson', {baserJson: {z: 987, x: 345 }}, { baserJson: { x: 'XXX' } }), {a: 123, b: {c: 456}, z: 987, x: 345});
	t.deepEqual(bDiv.pullProp('baserParam'), {a: 123, b: { c: 456 }});

	const img = $(`<img alt="">`);
	const bImg = new BaserElement(img);
	t.is(bImg.pullProp('alt'), '');

	const radio = $(`<input type="radio" checked>`);
	const bRadio = new BaserElement(radio);
	t.is(bRadio.pullProp('checked'), true);

	const table = $(`<table border="0"></table>`);
	const bTable = new BaserElement(table);
	t.is(bTable.pullProp('border'), 0);

	const table2 = $(`<table border="100%"></table>`);
	const bTable2 = new BaserElement(table2);
	t.is(bTable2.pullProp('border'), '100%');
});

test('::marge', t => {
	const div = $(`
		<div
			hidden
			tabindex="1"
			aria-hidden="false"
			data-baser
			data-baser-title=""
			data-baser-role="test"
			data-baser-num="0"
			data-baser-json='{"a": 123, "b": {"c": 456}}'
			>BaserElement</div>`);
	const bDiv = new BaserElement(div);
	t.deepEqual(
		bDiv.merge({
			baserNum: 1,
			bool: false,
		}, {
			hidden: undefined,
			ariaHidden: true,
		}),
		{
			hidden: true,
			ariaHidden: false,
			baserNum: 0,
			bool: false,
		}
	);
});
