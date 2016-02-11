import test from 'tape';

test('test tape configuration.', function(t) {
	t.plan(1);

	t.equal('hello', 'hello', 'say hello');
});
