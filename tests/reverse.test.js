const { test, describe } = require('node:test');
const assert = require('node:assert');

const reverse = require('../utils/for_testing').reverse;

describe('reverse', () => {
	test('of a is a', () => {
		assert.strictEqual(reverse('a'), 'a');
	});

	test('of react is tcaer', () => {
		assert.strictEqual(reverse('react'), 'tcaer');
	});

	test('of saippuakauppias is saippuakauppias', () => {
		assert.strictEqual(reverse('saippuakauppias'), 'saippuakauppias');
	});
});
