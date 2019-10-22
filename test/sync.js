import test from 'tape';
import { join, normalize } from 'path';
import totalist from '../src/sync';

const fixtures = join(__dirname, 'fixtures');

test('(sync) exports', t => {
	t.is(typeof totalist, 'function');
	t.end();
});


test('(sync) usage :: relative', t => {
	t.plan(21);

	let count = 0;
	let styles = [];
	let scripts = [];

	// +3 x 6
	totalist('test/fixtures', (name, abs, stats) => {
		count++;
		t.false(stats.isDirectory(), 'file is not a directory');
		t.true(abs.startsWith(fixtures), '~> `abs` is absolute');
		t.false(name.startsWith(fixtures), '~> `name` is NOT absolute');
		(/\.js$/.test(name) ? scripts : styles).push(name);
	});

	t.is(count, 6, 'saw 6 files total');

	t.same(scripts, ['aaa/index.js', 'bbb/ccc/index.js', 'bbb/index.js'].map(normalize), 'script `name` values are expected');
	t.same(styles, ['aaa/index.css', 'bbb/ccc/index.css', 'bbb/index.css'].map(normalize), 'style `name` values are expected');
});


test('(sync) usage :: absolute', t => {
	t.plan(21);

	let count = 0;
	let styles = [];
	let scripts = [];

	// +3 x 6
	totalist(fixtures, (name, abs, stats) => {
		count++;
		t.false(stats.isDirectory(), 'file is not a directory');
		t.true(abs.startsWith(fixtures), '~> `abs` is absolute');
		t.false(name.startsWith(fixtures), '~> `name` is NOT absolute');
		(/\.js$/.test(name) ? scripts : styles).push(name);
	});

	t.is(count, 6, 'saw 6 files total');

	t.same(scripts, ['aaa/index.js', 'bbb/ccc/index.js', 'bbb/index.js'].map(normalize), 'script `name` values are expected');
	t.same(styles, ['aaa/index.css', 'bbb/ccc/index.css', 'bbb/index.css'].map(normalize), 'style `name` values are expected');
});
