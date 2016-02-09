import babel from 'rollup-plugin-babel';

export default {
	entry: 'tmp/es6bundle.js',
	format: 'cjs',
	plugins: [babel()],
	dest: 'tmp/bundle.js'
};
