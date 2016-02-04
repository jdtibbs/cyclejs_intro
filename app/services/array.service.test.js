import * as service from './array.service';
import test from 'tape';

test('doubleArray', (t) => {
	t.plan(1);
	t.deepEqual([2, 4, 6], service.doubleArray([1, 2, 3]));
});

test('sum', (t) => {
	t.plan(1);
	t.equal(6, service.sum([1, 2, 3]));
});
